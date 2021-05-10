class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :brief_description
      t.text :description
      t.string :address_city
      t.string :address_district
      t.string :address_street
      t.string :store_name
      t.integer :reward, default: 200
      t.integer :behalf
      t.datetime :task_at
      t.datetime :task_end
      t.string :remarks
      t.string :status

      t.timestamps
    end
  end
end
