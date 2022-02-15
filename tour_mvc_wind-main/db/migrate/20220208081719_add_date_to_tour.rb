class AddDateToTour < ActiveRecord::Migration[7.0]
  def change
    add_column :tours, :date, :Date
  end
end
