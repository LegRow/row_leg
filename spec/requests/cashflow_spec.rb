require 'rails_helper'
include Newebpay

RSpec.describe "newebpay", type: :feature do

  # 這邊的測試比較像是 feature test，會以 selenium 去進行自動化操控，反正只要可以得到我們想得到的藍新回 post 即可
  driver = Selenium::WebDriver.for :chrome

  let(:website) do "14aa069f459c.ngrok.io" end # 這個之後應該要可以直接去抓 ngrok terminal 裡的網址，而且這個之後要不開啟網頁（headless），這是要接藍新的 post
  let(:test_data) do
    {
      reward: '200', # 可以是隨便的金額
      behalf: '90', # 可以是隨便的金額
      order_number: 'testing123' # 可以是隨便 order number
    }
  end

  context "when employer create task" do
    it "successfully pay" do
      # http://localhost:3000/cashflow/to_newebpay?for_newebpay%5Bbehalf%5D=90&for_newebpay%5Border_number%5D=1622520937&for_newebpay%5Breward%5D=200
      url_to_newebpay = URI::HTTP.build(
        :host => website,
        :path => '/cashflow/to_newebpay',
        :query =>
          {
            reward: test_data["reward"],
            behalf: test_data["behalf"],
            order_number: test_data["merchant_order_number"]
          }.to_query
      )
      puts "==============="
      puts url_to_newebpay
      driver.navigate.to url_to_newebpay
      sleep 10.second

      # assertion: get the post of success & the correct decoded 'MerchantOrderNo'

    end
  end

  # context "when employer click pay" do
  #   it "successfully pay" do
  #     # arrange: go to "./tasks" -> click pay
  #     # actions: redirect to "newebpay"
  #     # assertion: get the post of success
  #   end
  # end

  # context "when employee click apply" do
  #   it "successfully pay" do
  #   end
  # end

end
