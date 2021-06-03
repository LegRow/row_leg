FactoryBot.define do
  factory :order do
    merchant_order_number { Time.now.to_i.to_s }
    state { "MyString" }
    task { "" }
  end
end
