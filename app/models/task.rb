class Task < ApplicationRecord
  
  acts_as_paranoid
  
  
  
  
  
  def address
    [address_city, address_district, address_street].join
  end

end
