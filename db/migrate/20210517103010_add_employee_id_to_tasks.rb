class AddEmployeeIdToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :employee_id, :bigint
  end
end
