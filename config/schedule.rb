set :environment, :development
set :output, 'log/cron.log'

every 2.minutes do
  rake "task_test:auto_destroy_tasks"
end