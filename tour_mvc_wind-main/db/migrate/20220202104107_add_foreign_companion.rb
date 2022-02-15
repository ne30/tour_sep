class AddForeignCompanion < ActiveRecord::Migration[7.0]
  def change
    add_reference :companions, :user, index: true, foreign_key: true
    add_reference :companions, :tour, index: true, foreign_key: true
    add_reference :companions, :ticket, index: true, foreign_key: true
  end
end
