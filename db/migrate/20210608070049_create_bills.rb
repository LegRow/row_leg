class CreateBills < ActiveRecord::Migration[6.1]
  def change
    create_table :bills do |t|
      t.integer :need_pay
      t.string :title
      t.string :pay_to
      t.timestamps
    end
    add_reference :bills, :task, null: false, foreign_key: true
  end
end
