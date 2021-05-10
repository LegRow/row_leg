class Task < ApplicationRecord
  
  acts_as_paranoid
  
  validates :brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, presence: true
  
  
  private
  
  def address
    [address_city, address_district, address_street].join
  end

end
