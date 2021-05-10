FactoryBot.define do
  factory :task do
    brief_description { "MyString" }
    description { "MyText" }
    address_city { "MyString" }
    address_district { "MyString" }
    address_street { "MyString" }
    store_name { "MyString" }
    reward { 1 }
    behalf { 1 }
    task_at { "2021-05-10 14:01:11" }
    task_end { "2021-05-10 14:01:11" }
    remarks { "MyString" }
    status { "MyString" }
  end
end
