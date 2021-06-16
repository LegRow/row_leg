class AddColumnBillsTaskTime < ActiveRecord::Migration[6.1]
  def change
    add_column :bills, :task_time, :datetime
  end
end
