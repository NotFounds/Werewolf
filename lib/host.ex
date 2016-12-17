defmodule Werewolf.Host do

  def match(data) do
    {roles, _} = Enum.map_reduce(data.role_number, [], fn {role, count}, acc -> {List.duplicate(role, count), acc} end)
    roles = List.flatten(roles)
            |> Enum.shuffle
    participants = Enum.shuffle(data.participants)
                    |> Enum.map_reduce(0, fn {id, participant}, acc ->
                         {{id, Map.put(participant, :role, Enum.at(roles, acc))
                                |> Map.put(:page, "role")
                                |> Map.put(:is_alive, true)
                                |> Map.put(:votes, [])
                                |> Map.put(:options, [])
                          }, acc + 1}
                       end)
                    |> elem(0)
                    |> Enum.into(%{})
    werewolfs = Enum.filter(participants, fn i -> elem(i, 1).role == :werewolf end)
                  |> Enum.reduce([], fn i, acc -> List.insert_at(acc, -1, elem(i, 1).name) end)

    alive_peoples = data.participants
                    |> Enum.map_reduce(nil, fn {id, participant}, acc ->
                         {participant.name, acc}
                       end)
                    |> elem(0)
    Map.put(data, :participants, participants)
      |> Map.put(:alive_peoples, alive_peoples)
      |> Map.put(:dead_peoples,  [])
      |> Map.put(:result_of_day, [%{morning: %{dead_people: "マサハル"}}])
      |> Map.put(:date,          0)
      |> Map.put(:check_count,   0)
      |> Map.put(:werewolfs,     werewolfs)
  end

  def set_role(data, params) do
    role_number = params
                |> Enum.map_reduce(%{}, fn {role, num}, acc -> {nil, Map.put(acc, String.to_atom(role), num)} end)
                |> elem(1)
    Map.put(data, :role_number, role_number)
  end

  def start(data) do
    participants = data.participants
                    |> Enum.map_reduce(0, fn {id, participant}, acc ->
                         {{id, Map.put(participant, :page, "morning")}, 0}
                       end)
                    |> elem(0)
                    |> Enum.into(%{})
    Map.put(data, :mode, "morning")
      |> Map.put(:participants, participants)
  end

  def destroy(data) do
    participants = data.participants
                    |> Enum.map_reduce(0, fn {id, participant}, acc ->
                         {{id, Map.put(participant, :page, "destroied")}, 0}
                       end)
                    |> elem(0)
                    |> Enum.into(%{})
    Map.put(data, :mode, "destroied")
      |> Map.put(:participants, participants)
  end

  def set_name(data, params) do
    Map.put(data, :village_name, params)
  end

  def skip_meeting(data) do
    participants = data.participants
                    |> Enum.map_reduce(0, fn {id, participant}, acc ->
                         {{id, Map.put(participant, :page, "evening")}, 0}
                       end)
                    |> elem(0)
                    |> Enum.into(%{})
    Map.put(data, :mode, "evening")
      |> Map.put(:participants, participants)
  end

  def get_filter(data) do
    %{
      _default: true,
      participants: %{
        _default: %{
          is_alive: "isAlive",
          _default: true
        }
      },
      participants_number: "participantsNumber",
      result_of_day: "resultOfDay",
      alive_peoples: "alivePeoples",
      dead_peoples:  "deadPeoples",
      village_name:  "villageName",
      role_number:   "roleNumber"
    }
  end

  def filter_data(data) do
    Transmap.transform(data, get_filter(data), diff: false)
  end
end
