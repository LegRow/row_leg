class AddColumnUserRole < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :role, :string
  end
  add_reference :bills, :user, null: false, foreign_key: true
end
