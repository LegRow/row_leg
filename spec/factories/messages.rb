FactoryBot.define do
  factory :message do
    content { "MyText" }
    task { nil }
    room { nil }
  end
end
