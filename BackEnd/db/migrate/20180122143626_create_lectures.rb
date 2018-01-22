class CreateLectures < ActiveRecord::Migration[5.1]
  def change
    create_table :lectures do |t|
      t.string :title
      t.string :date_time

      t.timestamps
    end
  end
end
