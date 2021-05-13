class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :merchant_order_number
      t.string :state
      t.references :task

      t.timestamps
    end
  end
end
