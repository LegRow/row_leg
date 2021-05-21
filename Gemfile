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
# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

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

gem 'rqrcode', '~> 0.10.1'
gem 'pg'
gem 'omniauth'
gem 'omniauth-github'
gem 'omniauth-google-oauth2'
gem 'omniauth-rails_csrf_protection'
gem 'whenever', '~> 1.0'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'foreman', '~> 0.87.2'
  gem 'hirb-unicode', '~> 0.0.5'
  gem 'factory_bot_rails'
  gem 'faker', '~> 2.17'

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
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]


