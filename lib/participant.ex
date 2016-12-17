defmodule Werewolf.Participant do

  def set_name(%{participants: participants} = data, name, id) do
    if Map.has_key?(participants, id) do
      participant  = Map.put(participants[id], :name, name)
                     |> Map.put(:page, "description")
      participants = Map.put(participants, id, participant)
      Map.put(data, :participants, participants)
    else
      data
    end
  end

  def set_wait(%{participants: participants} = data, id) do
    if Map.has_key?(participants, id) do
      participant  = Map.put(participants[id], :page, "wait")
      participants = Map.put(participants, id, participant)
      Map.put(data, :participants, participants)
    else
      data
    end
  end

  def vote(%{participants: participants} = data, params, id) do
    if Map.has_key?(participants, id) do
      if participants[id].is_alive do
        votes = participants[id].votes
        if Enum.count(votes) == data.date do
          participant = Map.put(participants[id], :votes, List.insert_at(votes, -1, params))
          participants = Map.put(participants, id, participant)
          data = Map.put(data, :participants, participants)
        end
        countVote =  Enum.count(participants, fn {id, participant} -> Enum.count(participant.votes) >= data.date + 1 end)
        if countVote >= Enum.count(data.alive_peoples) do
          count = Enum.reduce(data.alive_peoples, [], fn (player, acc) ->
                        List.insert_at(acc, -1, {player, Enum.count(participants, fn {id, participant} ->
                          Enum.at(participant.votes, data.date) == player
                        end)})
                      end)
                      |> Map.new
          max = Enum.max_by(count, fn {name, vote} -> vote end) |> elem(1)
          dead = Enum.filter(count, fn {name, vote} -> vote == max end)
                  |> Enum.random
                  |> elem(0)
          vote_to = Enum.filter(participants, fn {id, participant} -> participant.is_alive == true end)
                    |> Enum.reduce(%{}, fn {id, participants}, acc -> Map.put(acc, participant.name, Enum.at(participant.votes, data.date)) end)
          deadPeople = Enum.find(participants, fn {id, participant} -> participant.name == dead end)
          dead_id       = deadPeople |> elem(0)
          personal      = deadPeople |> elem(1)
          participants  = Map.put(participants, dead_id, Map.put(personal, :is_alive, false))
          alive_peoples = List.delete(data.alive_peoples, dead)
          dead_peoples  = List.insert_at(data.dead_peoples, -1, dead)
          result = Map.merge(Enum.at(data.result_of_day, data.date), %{
            evening: %{
              dead_people: dead,
              votes: vote_to,
              count: count
            }
          })
          result_of_day = List.replace_at(data.result_of_day, data.date, result)
          data = data
                  |> Map.put(:result_of_day, result_of_day)
                  |> Map.put(:participants, participants)
                  |> Map.put(:alive_peoples, alive_peoples)
                  |> Map.put(:dead_peoples,  dead_peoples)
        end
        check(data, id)
      else
        data
      end
    else
      data
    end
  end

  # Todo
  def ability(%{participants: participants} = data, params, id) do
    case participants[id].role do
      :werewolf -> raid(data, params, id) |> check(id)
      :seer     -> seer(data, params, id)
      :psychic  -> psychic(data, params, id)
      :hunter   -> check(data, id) ## todo
      _ -> check(data, id)
    end
  end

  def raid(%{participants: participants} = data, params, id) do
    raid = participants[id].options
    if Enum.count(raid) == data.date do
      participant = Map.put(participants[id], :options, List.insert_at(raid, -1, params))
      participants = Map.put(participants, id, participant)
      data = Map.put(data, :participants, participants)
    end
    data
  end

  def seer(%{participants: participants} = data, params, id) do
    participant = participants[id]
    if participant.is_alive do
      if Enum.count(participant.options) <= data.date do
        personal = Enum.find(participants, fn {id, participant} -> participant.name == params and participant.is_alive end)
                    |> elem(1)
        isWerewolf = data.role[personal.role].isWerewolf
        participant = Map.put(participants[id], :options, List.insert_at(participant.options, -1, %{target: params, isWerewolf: isWerewolf}))
        participants = Map.put(participants, id, participant)
        data = Map.put(data, :participants, participants)
      else
        data
      end
    else
      data
    end
  end

  def psychic(%{participants: participants} = data, params, id) do
    participant = participants[id]
    if participant.is_alive do
      if Enum.count(participant.options) <= data.date do
        personal = Enum.find(participants, fn {id, participant} -> participant.name == params and participant.is_alive == false end)
                    |> elem(1)
        isWerewolf = data.role[personal.role].isWerewolf
        participant = Map.put(participants[id], :options, List.insert_at(participant.options, -1, %{target: params, isWerewolf: isWerewolf}))
        participants = Map.put(participants, id, participant)
        data = Map.put(data, :participants, participants)
      else
        data
      end
    else
      data
    end
  end

  def hunter(%{participants: participants} = data, params, id) do
    protection = participants[id].options
    if Enum.count(protection) == data.date do
      participant = Map.put(participants[id], :options, List.insert_at(protection, -1, params))
      participants = Map.put(participants, id, participant)
      data = Map.put(data, :participants, participants)
    end
    data
  end

  def check(%{participants: participants} = data, id) do
    if Map.has_key?(participants, id) do
      # Set wait
      participant = Map.put(participants[id], :page, "wait")
      participants = Map.put(participants, id, participant)

      # if Everyone is Ready
      if (data.check_count + 1) >= Enum.count(data.alive_peoples) do

        if data.mode == "night" do
          # Result of Raid
          werewolfs = Enum.filter(participants, fn {id, participant} -> participant.role == :werewolf and participant.is_alive end)
          hunters = Enum.filter(participants, fn {id, participant} -> participant.role == :hunter and participant.is_alive end)
          protected = Enum.reduce(hunters, [], fn {id, participant}, acc -> Enum.at(participant.options, data.date) end)
          count = Enum.reduce(data.alive_peoples, [], fn (player, acc) ->
                    List.insert_at(acc, -1, {player, Enum.count(werewolfs, fn {id, participant} ->
                      (Enum.at(participant.options, data.date) == player and !(Enum.find_value(protected, player)))
                    end)})
                  end)
                  |> Map.new
          max = Enum.max_by(count, fn {name, raid} -> raid end) |> elem(1)
          if max == 0 do
            result = %{morning: %{dead_people: nil}}
            data = data
                  |> Map.put(:result_of_day, List.insert_at(data.result_of_day, -1, result))
          else
            dead = Enum.filter(count, fn {name, raid} -> raid == max end)
              |> Enum.random
              |> elem(0)
            dead_people   = Enum.find(participants, fn {id, participant} -> participant.name == dead end)
            dead_id       = dead_people |> elem(0)
            personal      = dead_people |> elem(1)
            participants  = Map.put(participants, dead_id, Map.put(personal, :is_alive, false))
            alive_peoples = List.delete(data.alive_peoples, dead)
            dead_peoples  = List.insert_at(data.dead_peoples, -1, dead)

            result = %{morning: %{dead_people: dead}}
            data = data
                  |> Map.put(:result_of_day, List.insert_at(data.result_of_day, -1, result))
                  |> Map.put(:participants,  participants)
                  |> Map.put(:alive_peoples, alive_peoples)
                  |> Map.put(:dead_peoples,  dead_peoples)
          end
        end

        data = change_turn(data)
        participants = data.participants
                        |> Enum.map_reduce(0, fn {id, participant}, acc ->
                             {{id, Map.put(participant, :page, data.mode)}, 0}
                           end)
                        |> elem(0)
                        |> Enum.into(%{})
        data = Map.put(data, :participants, participants)
      else
        data = Map.put(data, :participants, participants)
                |> Map.put(:check_count, data.check_count + 1)
      end
    end
    data
  end

  def change_turn(data) do
    mode = data.mode
    mode = case mode do
      "morning" -> "meeting"
      "meeting" -> "evening"
      "evening" -> "night"
      "night"   -> "morning"
    end
    date = if mode == "morning", do: data.date + 1, else: data.date
    state = checkGameState(data)
    if state do
      mode = "result"
      result = Map.merge(Enum.at(data.result_of_day, data.date), %{
        isEnd: true,
        side: data.roles[state].name,
        players: data.participants
      })
      data = Map.put(data, :result_of_day, List.insert_at(data.result_of_day, -1, result))
    end
    data = data
            |> Map.put(:mode, mode)
            |> Map.put(:check_count, 0)
            |> Map.put(:date, date)
  end

  def checkGameState(%{participants: participants} = data) do
    werewolf_num = participants
                    |> Enum.filter(fn {id, participant} -> data.roles[participant.role].isWerewolfSide and participant.is_alive end)
                    |> Enum.count
    alive_peoples_num = Enum.count(data.alive_peoples)
    cond do
      werewolf_num == 0 -> :villager
      werewolf_num * 2 >= alive_peoples_num -> :werewolf
      true -> nil
    end
  end

  def get_filter(data, id) do
    participants = %{
      id => %{
        is_alive: "isAlive",
        id:       true,
        name:     true,
        page:     true,
        role:     true,
        votes:    true,
        options:  true,
        _default: true
      }
    }
    if data.participants[id].is_alive == false or data.mode == "result" do
      participants = %{
        _default: %{
          is_alive: "isAlive",
          _default: true
        }
      }
    end
    %{
      participants: participants,
      participants_number: "participantsNumber",
      isEnd: true,
      mode:  true,
      date:  true,
      roles: true,
      result_of_day: "resultOfDay",
      alive_peoples: "alivePeoples",
      dead_peoples:  "deadPeoples",
      village_name:  "villageName",
      werewolfs: data.participants[id].role == :werewolf,
      _spread: [[:participants, id]]
    }
  end

  def filter_data(data, id) do
    Transmap.transform(data, get_filter(data, id), diff: false)
    |> Map.delete(:participants)
  end
end

