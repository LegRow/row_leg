class Room < ApplicationRecord
  belongs_to :task
  has_many :messages
end
