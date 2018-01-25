class User < ApplicationRecord
  has_secure_password

  has_many :notebooks
  has_many :lectures, through: :notebooks

end
