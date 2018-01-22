class Lecture < ApplicationRecord
  has_many :notebooks
  has_many :users, through: :notebooks
end
