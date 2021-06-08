class AddColumnBills < ActiveRecord::Migration[6.1]
  def change
    add_column :bills, :pay_who, :string
  end
end
