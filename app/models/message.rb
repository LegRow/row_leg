class Message < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  belongs_to :room
  # attr_accessor :message
  validates :content, presence: true
end
