以下是新增的gem
gem 'bootsnap', '>= 1.4.4', require: false
gem 'devise'#會員 bundle而已
gem 'kaminari'#分頁  bundle而已
gem "figaro"#安全Key  bundle而已
gem 'hotwire-rails'#先進技術  bundle而已
gem "paranoia", "~> 2.2"#假刪除  bundle而已
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0' 
gem 'sidekiq', '~> 6.2', '>= 6.2.1'
#上面兩個後台工具 bundle而已


group :development, :test do
  gem 'foreman', '~> 0.87.2' #快速開發(設定好了 foreman s 就可以了)
  gem 'hirb-unicode', '~> 0.0.5'#irb整齊表格
  gem 'rspec-rails' #TDD用...不一定要用
  gem 'factory_bot_rails' #同上
end

前端部分

#yarn add axios, tailwindcss, Vue
#tailwindcss 引入成功
