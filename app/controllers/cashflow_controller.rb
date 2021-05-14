class CashflowController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def to_newebpay
    # 串藍新至少要這些東西
    # ['MerchantID', 'MS119996394'],
    # ['RespondType', 'JSON'],
    # ['TimeStamp', Time.now.to_i.to_s],
    # ['Version', '1.5'],
    # ['MerchantOrderNo', Time.now.to_i.to_s],
    # ['Amt', '93'],
    # ['ItemDesc', 'TEST'],
    # ['Email', 't5204713910@gmail.com'],
    # ['ReturnURL' ,"/cashflow/thankyou"]

    params_for_newbpay = params["for_newebpay"]
    employer_needs_to_pay = params_for_newbpay["reward"].to_i + params_for_newbpay["behalf"].to_i

    @data_for_newebpay = [
      ['MerchantID', 'MS119996394'],
      ['RespondType', 'JSON'],
      ['TimeStamp', Time.now.to_i.to_s],
      ['Version', '1.5'],
      ['MerchantOrderNo', params_for_newbpay["order_number"]],
      ['Amt', employer_needs_to_pay.to_s],
      ['ItemDesc', 'TEST'],
      ['Email', 't5204713910@gmail.com'],
      ['ReturnURL' ,"https://c639fd427b94.ngrok.io/cashflow/thankyou"],
      ['NotifyURL', "https://c639fd427b94.ngrok.io/cashflow/from_newebpay"]
    ]
  end

end
