require_relative "boot"
require "rails/all"
require "./lib/cloudflare_proxy"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GemYarnInit
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.assets.precompile << "audios/*"
    config.load_defaults 6.1
    config.autoloader = :classic
    config.autoload_paths += %W(#{config.root}/lib)
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = "Taipei"
    # config.eager_load_paths << Rails.root.join("extras")
    config.i18n.default_locale = "zh-TW"
    config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}')]
    # 解決Cloudflare https match問題
    config.middleware.use ::CloudflareProxy
    config.serve_static_assets = true
  end
end
