class CreateTours < ActiveRecord::Migration[7.0]
  def change
    create_table :tours do |t|
      t.string :tour_code
      t.string :from
      t.string :to
      t.string :day
      t.time :start_time
      t.time :end_time
      t.integer :passenger_limit
      t.float :price

      t.timestamps
    end
  end
end
