class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  attr_accessor :message

  validates :content, presence: true
end
