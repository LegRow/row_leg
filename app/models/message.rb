class Message < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  belongs_to :room
  validates :content, presence: true
end
