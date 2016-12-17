defmodule Werewolf.Main do
  alias Werewolf.Host
  alias Werewolf.Participant

  @roles %{
    villager: %{name: "村人",   isWerewolfSide: false, isWerewolf: false, description: "特殊能力はありません。現在の情報を元に推理し、村を平和に導きましょう。"},
    psychic:  %{name: "霊媒師", isWerewolfSide: false, isWerewolf: false, description: "夜に、処刑された人が人狼か否かを知ることができます。"},
    seer:     %{name: "占い師", isWerewolfSide: false, isWerewolf: false, description: "夜に、生存者を1人占うことができ、人狼か否かを知ることができます。(狂人や狩人を占っても村人と出ます。)"},
    hunter:   %{name: "狩人",   isWerewolfSide: false, isWerewolf: false, description: "夜に、生存者1人を守ることができます。狩人が守っている人を人狼が襲撃した場合、襲撃は失敗し、翌日犠牲者は発生しません。しかし、自分自身を守ることはできません。"},
    werewolf: %{name: "人狼",   isWerewolfSide: true, isWerewolf: true, description: "人の皮をかぶった狼です。夜のターンで村人を1人襲撃して食い殺し(噛み)ます。人狼は人間に対し、1対1では力で勝てますが、相手が村人2名だと勝てません。よって、人狼の数と村人の数が同数になるまで、1人づつ噛んでいきます。また、人狼が複数いる場合、他の人狼を知ることができます。"},
    minion:   %{name: "狂人",   isWerewolfSide: true, isWerewolf: false, description: "人狼側ですが、占いと霊能結果では「人狼ではない」と判定されます。人狼側が勝利することで、狂人も勝利となります。"}}

  def init do
    %{
      participants_number: 0,
      village_name: "",
      roles: @roles,
      role_number: %{
        villager: 0,
        psychic:  0,
        seer:     0,
        hunter:   0,
        werewolf: 0,
        minion:   0},
      mode: "preparation",
      date: 0,
      werewolfs: [],
      result_of_day: [],
      alive_peoples: [],
      dead_peoples: [],
      host: %{},
      participants: %{},
      confirmed_count: 0
    }
  end

  def new_participant(id) do
    %{
        id: id,
        name: "",
        page: "name",
        role: nil,
        is_alive: true,
        votes: [],
        options: [], # Raid, Psychic, CheckRole, Revenge, etc...
        notifications: []
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(id)
      data
      |> put_in([:participants, id], new)
      |> Map.update!(:participants_number, fn n -> n + 1 end)
    else
      data
    end
  end

  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]

    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end
end
