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

ActiveRecord::Schema.define(version: 2022_02_08_083211) do

  create_table "companions", force: :cascade do |t|
    t.integer "gender"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "tour_id"
    t.integer "ticket_id"
    t.index ["ticket_id"], name: "index_companions_on_ticket_id"
    t.index ["tour_id"], name: "index_companions_on_tour_id"
    t.index ["user_id"], name: "index_companions_on_user_id"
  end

  create_table "tickets", force: :cascade do |t|
    t.string "companion_user_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "tour_id"
    t.index ["tour_id"], name: "index_tickets_on_tour_id"
    t.index ["user_id"], name: "index_tickets_on_user_id"
  end

  create_table "tours", force: :cascade do |t|
    t.string "tour_code"
    t.string "from"
    t.string "to"
    t.time "start_time"
    t.time "end_time"
    t.integer "passenger_limit"
    t.float "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "date"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name"
    t.integer "gender"
    t.string "password_digest"
    t.boolean "is_admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "companions", "tickets"
  add_foreign_key "companions", "tours"
  add_foreign_key "companions", "users"
  add_foreign_key "tickets", "tours"
  add_foreign_key "tickets", "users"
end
