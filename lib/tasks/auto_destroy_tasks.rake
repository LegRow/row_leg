namespace :task_test do
  desc '刪除過期任務'
  task auto_destroy_tasks: :environment do
    @tasks = Task.all
    @tasks.each do |task|
      if (task.task_at - Time.now) < 1800
        task.room.messages.each { |message| message.delete }
        task.room.destroy
        task.destroy
      end
    puts "刪除成功"
    end
  end
end
task default: [:auto_destroy_tasks]