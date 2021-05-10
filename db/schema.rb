# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_10_060111) do

  create_table "tasks", force: :cascade do |t|
    t.string "brief_description"
    t.text "description"
    t.string "address_city"
    t.string "address_district"
    t.string "address_street"
    t.string "store_name"
    t.integer "reward", default: 200
    t.integer "behalf"
    t.datetime "task_at"
    t.datetime "task_end"
    t.string "remarks"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
