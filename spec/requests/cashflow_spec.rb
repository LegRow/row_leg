require 'rails_helper'

RSpec.describe "Cashflows", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/cashflow/index"
      expect(response).to have_http_status(:success)
    end
  end

end
