require 'rails_helper'
require 'factory_bot_rails'
include Newebpay

RSpec.describe "newebpay", type: :feature do

  # # 這邊的測試比較像是 feature test，會以 selenium 去進行自動化操控，反正只要可以得到我們想得到的藍新回 post 即可
  driver = Selenium::WebDriver.for(:chrome)
  let(:website) do ENV["web_https"] end # 這個之後應該要可以直接去抓 ngrok terminal 裡的網址，而且這個之後要不開啟網頁（headless），這是要接藍新的 post

  test_task = FactoryBot.create(:task)

  context "when employer create task" do
    it "successfully pay" do
      # arrange
      url_to_newebpay = URI::HTTP.build(
        :host => website,
        :path => '/cashflow/to_newebpay',
        :query =>
          {
            reward: test_task.reward,
            behalf: test_task.behalf,
            order_number: test_task.order.merchant_order_number
          }.to_query
      )
      # actions
      driver.navigate.to url_to_newebpay
      sleep 1.second
      driver.find_element(:id => "webatm_HNCB").click
      driver.find_element(:name => "confirm_order").click
      driver.find_element(:id => "confirm_send_order").click
      sleep 1.second
      # assertion: the task state turn into employee_paid
      sleep 30.second
      test_task = Task.find_by(id: test_task.id)
      expect(test_task.state).to have_text "employer_paid"
    end
  end
end
