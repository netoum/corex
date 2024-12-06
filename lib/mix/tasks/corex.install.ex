defmodule Mix.Tasks.Corex.Install do
  @moduledoc """
  Installs Corex executable and assets.

      $ mix corex.install
      $ mix corex.install --if-missing

  By default, it installs #{Corex.latest_version()} but you
  can configure it in your config files, such as:

      config :corex, :version, "#{Corex.latest_version()}"

  ## Options

      * `--runtime-config` - load the runtime configuration
        before executing command

      * `--if-missing` - install only if the given version
        does not exist

      * `--no-assets` - does not install Corex assets

  ## Assets

  Whenever Corex is installed, a default corex configuration
  will be placed in a new `assets/corex.config.js` file. See
  the [corex documentation](https://corexcss.com/docs/configuration)
  on configuration options.

  The default corex configuration includes Corex variants for Phoenix
  LiveView specific lifecycle classes:

    * phx-no-feedback - applied when feedback should be hidden from the user
    * phx-click-loading - applied when an event is sent to the server on click
      while the client awaits the server response
    * phx-submit-loading - applied when a form is submitted while the client awaits the server response
    * phx-submit-loading - applied when a form input is changed while the client awaits the server response

  Therefore, you may apply a variant, such as `phx-click-loading:animate-pulse`
  to customize corex classes when Phoenix LiveView classes are applied.
  """

  @shortdoc "Installs Corex executable and assets"
  @compile {:no_warn_undefined, Mix}

  use Mix.Task

  @impl true
  def run(args) do
    valid_options = [runtime_config: :boolean, if_missing: :boolean, assets: :boolean]

    {opts, base_url} =
      case OptionParser.parse_head!(args, strict: valid_options) do
        {opts, []} ->
          {opts, Corex.default_base_url()}

        {opts, [base_url]} ->
          {opts, base_url}

        {_, _} ->
          Mix.raise("""
          Invalid arguments to corex.install, expected one of:

              mix corex.install
              mix corex.install 'https://github.com/corexlabs/corexcss/releases/download/v$version/corexcss-$target'
              mix corex.install --runtime-config
              mix corex.install --if-missing
          """)
      end

    if opts[:runtime_config], do: Mix.Task.run("app.config")

    if opts[:if_missing] && latest_version?() do
      :ok
    else
      # if Keyword.get(opts, :assets, true) do
      #   File.mkdir_p!("assets/css")
      #   corex_config_path = Path.expand("assets/corex.config.js")

      #   prepare_app_css()
      #   prepare_app_js()

      #   unless File.exists?(corex_config_path) do
      #     File.write!(corex_config_path, """
      #     // See the Corex configuration guide for advanced usage
      #     // https://corexcss.com/docs/configuration

      #     let plugin = require('corexcss/plugin')

      #     module.exports = {
      #       content: [
      #         './js/**/*.js',
      #         '../lib/*_web.ex',
      #         '../lib/*_web/**/*.*ex'
      #       ],
      #       theme: {
      #         extend: {},
      #       },
      #       plugins: [
      #         require('@corexcss/forms'),
      #         plugin(({addVariant}) => addVariant('phx-click-loading', ['&.phx-click-loading', '.phx-click-loading &'])),
      #         plugin(({addVariant}) => addVariant('phx-submit-loading', ['&.phx-submit-loading', '.phx-submit-loading &'])),
      #         plugin(({addVariant}) => addVariant('phx-change-loading', ['&.phx-change-loading', '.phx-change-loading &']))
      #       ]
      #     }
      #     """)
      #   end
      # end

      if function_exported?(Mix, :ensure_application!, 1) do
        Mix.ensure_application!(:inets)
        Mix.ensure_application!(:ssl)
      end

      Mix.Task.run("loadpaths")
      Corex.install(base_url)
    end
  end

  defp latest_version?() do
    version = Corex.configured_version()
    match?({:ok, ^version}, Corex.bin_version())
  end

  # defp prepare_app_css do
  #   app_css =
  #     case File.read("assets/css/app.css") do
  #       {:ok, str} -> str
  #       {:error, _} -> ""
  #     end

  #   unless app_css =~ "corex" do
  #     File.write!("assets/css/app.css", """
  #     @import "corexcss/base";
  #     @import "corexcss/components";
  #     @import "corexcss/utilities";

  #     #{String.replace(app_css, ~s|@import "./phoenix.css";\n|, "")}\
  #     """)
  #   end
  # end

  # defp prepare_app_js do
  #   case File.read("assets/js/app.js") do
  #     {:ok, app_js} ->
  #       File.write!("assets/js/app.js", String.replace(app_js, ~s|import "../css/app.css"\n|, ""))

  #     {:error, _} ->
  #       :ok
  #   end
  # end
end
