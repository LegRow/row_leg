class ChangeColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :bills, :task_time
    add_column :bills, :task_time, :integer
  end
end
