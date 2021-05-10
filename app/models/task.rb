class Task < ApplicationRecord
  
  acts_as_paranoid
  belongs_to :user
  
  
  
  
  def address
    [address_city, address_district, address_street].join
  end

end
