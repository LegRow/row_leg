class Chat < ApplicationRecord
  validates_uniqueness_of :username
end
