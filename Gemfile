source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.3'

gem 'rails', '~> 6.1.3', '>= 6.1.3.2'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'devise'
gem 'kaminari'
gem "paranoia", "~> 2.2"
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
gem 'sidekiq', '~> 6.2', '>= 6.2.1'
gem 'pundit', '~> 2.1'
gem 'geocoder', '~> 1.6', '>= 1.6.7'
gem 'gmaps4rails', '~> 2.1', '>= 2.1.2'
gem "aasm", "~> 5.2"
# 管理機密資訊
gem "figaro", "~> 1.2"

# gem "newebpay", path: "./lib/newebpay.rb"

gem 'pg'
gem 'omniauth'
gem 'omniauth-github'
gem 'omniauth-google-oauth2'
gem 'omniauth-rails_csrf_protection'
gem 'whenever', '~> 1.0'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'
gem 'aws-sdk-s3', '~> 1.95', '>= 1.95.1'
gem 'active_storage_validations', '~> 0.9.3'

group :development, :test do
  gem 'rspec-rails', '~> 5.0.0'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'foreman', '~> 0.87.2'
  gem 'hirb-unicode', '~> 0.0.5'
  gem 'bullet', '~> 6.1', '>= 6.1.4'
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  gem 'spring'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'database_cleaner'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "rails-i18n", "~> 6.0"
