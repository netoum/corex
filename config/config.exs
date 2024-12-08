import Config

config :logger, :console,
  colors: [enabled: false],
  format: "\n$time $metadata[$level] $message\n"

config :phoenix,
  json_library: Jason,
  stacktrace_depth: 20,
  trim_on_html_eex_engine: false

  if Mix.env() == :dev do
    esbuild = fn args ->
      [
        args: ~w(./js/corex ./node_modules/@zag-js/core --bundle) ++ args,
        cd: Path.expand("../assets", __DIR__),
        env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}

      ]
    end

  config :esbuild,
    version: "0.17.11",
    module: esbuild.(~w(--format=esm --sourcemap --outdir=../priv/static)),
    main: esbuild.(~w(--format=cjs --sourcemap --outdir=../priv/static)),
    cdn:
      esbuild.(
        ~w(--target=es2016 --format=iife --global-name=Corex --outdir=../priv/static)
      ),
    cdn_min:
      esbuild.(
        ~w(--target=es2016 --format=iife --global-name=Corex --minify --outdir=../priv/static)
      )
    # zagjs:
    # zagjs.(
    #     ~w(--format=esm --sourcemap --outdir=../priv/static/@zag-js)
    #   )
end
