class AddSignupColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :gender, :string
    add_column :users, :tel, :integer
    add_column :users, :age, :integer
    add_column :users, :bank_account, :integer

    add_index :users, :gender
  end
end
