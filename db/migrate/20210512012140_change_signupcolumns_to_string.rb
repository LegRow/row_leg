class ChangeSignupcolumnsToString < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :tel, :string
    change_column :users, :bank_account, :string
  end
end
