defmodule Mix.Tasks.Corex do
  @moduledoc """
  Invokes corex with the given args.

  Usage:

      $ mix corex TASK_OPTIONS PROFILE TAILWIND_ARGS

  Example:

      $ mix corex default --config=corex.config.js \
        --input=css/app.css \
        --output=../priv/static/assets/app.css \
        --minify

  If corex is not installed, it is automatically downloaded.
  Note the arguments given to this task will be appended
  to any configured arguments.

  ## Options

    * `--runtime-config` - load the runtime configuration
      before executing command

  Note flags to control this Mix task must be given before the
  profile:

      $ mix corex --runtime-config default
  """

  @shortdoc "Invokes corex with the profile and args"
  @compile {:no_warn_undefined, Mix}

  use Mix.Task

  @impl true
  def run(args) do
    switches = [runtime_config: :boolean]
    {opts, remaining_args} = OptionParser.parse_head!(args, switches: switches)

    if function_exported?(Mix, :ensure_application!, 1) do
      Mix.ensure_application!(:inets)
      Mix.ensure_application!(:ssl)
    end

    if opts[:runtime_config] do
      Mix.Task.run("app.config")
    else
      Mix.Task.run("loadpaths")
      Application.ensure_all_started(:corex)
    end

    Mix.Task.reenable("corex")
    install_and_run(remaining_args)
  end

  defp install_and_run([profile | args] = all) do
    case Corex.install_and_run(String.to_atom(profile), args) do
      0 -> :ok
      status -> Mix.raise("`mix corex #{Enum.join(all, " ")}` exited with #{status}")
    end
  end

  defp install_and_run([]) do
    Mix.raise("`mix corex` expects the profile as argument")
  end
end
