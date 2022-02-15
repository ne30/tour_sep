class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.string :companion_user_name

      t.timestamps
    end
  end
end
