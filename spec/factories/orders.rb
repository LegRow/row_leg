FactoryBot.define do
  factory :order do
    merchant_order_number { "MyString" }
    state { "MyString" }
    task { "" }
  end
end
