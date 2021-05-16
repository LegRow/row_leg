class Room < ApplicationRecord
  acts_as_paranoid
  belongs_to :task
  has_many :messages
end
