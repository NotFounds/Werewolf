defmodule Werewolf do
  use XeeThemeScript
  require Logger
  alias Werewolf.Main
  alias Werewolf.Actions
  alias Werewolf.Host
  alias Werewolf.Participant

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{data: Main.init()}}
  end

  def join(data, id) do
    wrap_result(data, Main.join(data, id))
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Werewolf] #{action} #{inspect params}")
    result = case {action, params} do
      {"fetch contents", _} -> Actions.update_host_contents(data)
      {"match", _}          -> Host.match(data)
      {"set_role", params}  -> Host.set_role(data, params)
      {"start", _}          -> Host.start(data)
      {"destroy", _}        -> Host.destroy(data)
      {"skip_meeting", _}   -> Host.skip_meeting(data)
      {"set_villageName", params} -> Host.set_name(data, params)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Werewolf] #{action} #{inspect params}")
    result = case {action, params} do
      {"fetch contents", _} -> Actions.update_participant_contents(data, id)
      {"set_wait", _}       -> Participant.set_wait(data, id)
      {"set_name", params}  -> Participant.set_name(data, params, id)
      {"vote", params}      -> Participant.vote(data, params, id)
      {"ability", params}   -> Participant.ability(data, params, id)
      {"checked", _}        -> Participant.check(data, id)
      {"result", _}         -> Participant.result(data, id)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Utilities
  def wrap_result(old, {:ok, result}) do
    {:ok, Main.compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    {:ok, Main.compute_diff(old, %{data: new})}
  end
end
