class AddColumnAddressStore < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :address_and_store, :string
  end
end
