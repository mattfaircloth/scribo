class User < ApplicationRecord
  has_many :notebooks
  has_many :lectures, through: :notebooks

end
