class Message < ApplicationRecord
  belongs_to :task
  belongs_to :room

  attr_accessor :message
end
