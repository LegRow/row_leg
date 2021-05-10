source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.3'

gem 'rails', '~> 6.1.3', '>= 6.1.3.2'
gem 'sqlite3', '~> 1.4'
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
gem 'devise'#會員 bundle而已
gem 'kaminari'#分頁  bundle而已
gem 'hotwire-rails'#先進技術  bundle而已
gem "paranoia", "~> 2.2"#假刪除  bundle而已
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0' 
gem 'sidekiq', '~> 6.2', '>= 6.2.1'
#上面兩個後台工具 bundle而已
gem 'pundit', '~> 2.1'
#建立管理者工具 bundle而已
gem 'rails-i18n', '~> 6.0'
#轉中文用 bundle
gem 'geocoder', '~> 1.6', '>= 1.6.7'
gem 'gmaps4rails', '~> 2.1', '>= 2.1.2'
#上兩個 串接googlemap相關
gem "aasm", "~> 5.2"
# 狀態機
gem "figaro", "~> 1.2"
# 管理機密資訊

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'foreman', '~> 0.87.2' #快速開發(設定好了 foreman s 就可以了)
  gem 'hirb-unicode', '~> 0.0.5'#irb整齊表格
  gem 'rspec-rails' #TDD用...不一定要用
  gem 'factory_bot_rails' #同上
  gem 'faker', '~> 2.17' #假資料用
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

#yarn add axios, tailwindcss,
#tailwindcss 只有init跟在postcss.config.js裡require
#rails webpacker:install:vue
