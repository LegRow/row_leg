desc '刪除過期任務'
task auto_destroy_tasks: :environment do
  @tasks = Task.all
  @tasks.each {
    |task| task.destroy if (task.task_at - Time.now) < 1800
  }
  puts "刪除成功"
end

task default: [:auto_destroy_tasks]