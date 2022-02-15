class AddForeignTicket < ActiveRecord::Migration[7.0]
  def change
    add_reference :tickets, :user, index: true, foreign_key: true
    add_reference :tickets, :tour, index: true, foreign_key: true
  end
end
