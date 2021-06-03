FactoryBot.define do
  factory :task do
    brief_description { "MyString" }
    description { "MyText" }
    address_city { "MyString" }
    address_district { "MyString" }
    address_street { "MyString" }
    store_name { "MyString" }
    reward { 2000 }
    behalf { 90 }
    task_at { 4.hours.from_now }
    task_end { 6.hours.from_now }
    remarks { "MyString" }
    status { "MyString" }
    association :user, email: Faker::Internet.email, password: 'testtest'
    after(:create) do |task|
      task.order ||= create(:order, :task => task)
    end
  end
end
