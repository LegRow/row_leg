class Task < ApplicationRecord
  
  
  
  
  
  
  def address
    [address_city, address_district, address_street].join
  end

end
