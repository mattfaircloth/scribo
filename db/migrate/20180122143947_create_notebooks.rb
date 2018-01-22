class CreateNotebooks < ActiveRecord::Migration[5.1]
  def change
    create_table :notebooks do |t|
      t.belongs_to :lecture, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.string :content

      t.timestamps
    end
  end
end
