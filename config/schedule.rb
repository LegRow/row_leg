#測試whenever用  
set :environment, "development"
set :output, {:error => "log/cron_error_log.log", :standard => "log/cron_log.log"}

every 2.minutes do
  rake "task_test:auto_destroy_tasks"
end