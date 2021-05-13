class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  attr_accessor :message
end
