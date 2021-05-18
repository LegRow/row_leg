class Order < ApplicationRecord
  belongs_to :task
  # has_one :room
end
