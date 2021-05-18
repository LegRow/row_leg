class AddUserToMessage < ActiveRecord::Migration[6.1]
  def change
    remove_reference(:messages, :task, index: true, foreign_key: true)
    add_reference(:messages, :user)
  end
end
