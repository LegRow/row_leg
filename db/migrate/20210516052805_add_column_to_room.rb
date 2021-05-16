class AddColumnToRoom < ActiveRecord::Migration[6.1]
  def change
    add_column :rooms, :deleted_at, :datetime
    add_index :rooms, :deleted_at
    add_column :messages, :deleted_at, :datetime
    add_index :messages, :deleted_at
  end
end
