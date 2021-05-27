namespace :task_test do
  desc '刪除過期任務'
  task auto_destroy_tasks: :environment do
    @tasks = Task.all
    @tasks.each do |task|
      if (task.task_at - Time.now) < 3.hours
        task.room.messages.destroy_all
        task.room.destroy
        task.destroy
      end
    puts "刪除成功"
    end
  end
end
task default: [:auto_destroy_tasks]