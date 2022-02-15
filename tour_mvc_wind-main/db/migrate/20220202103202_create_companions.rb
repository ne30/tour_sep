class CreateCompanions < ActiveRecord::Migration[7.0]
  def change
    create_table :companions do |t|
      t.integer :gender

      t.timestamps
    end
  end
end
