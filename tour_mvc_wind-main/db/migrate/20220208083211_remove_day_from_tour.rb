class RemoveDayFromTour < ActiveRecord::Migration[7.0]
  def change
    remove_column :tours, :day
  end
  # def up
  #   remove_column :tours, :day
  # end
  # def down

  # end
end
