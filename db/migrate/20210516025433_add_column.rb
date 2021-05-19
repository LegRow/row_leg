class AddColumn < ActiveRecord::Migration[6.1]
  def change
    add_reference(:rooms, :task)
  end
end
