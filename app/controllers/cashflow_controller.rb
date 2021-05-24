class CashflowController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:from_newebpay, :thankyou]

  def to_newebpay
    # 串藍新至少要這些東西
    # ['MerchantID', 'MS119996394'],
    # ['RespondType', 'JSON'],
    # ['TimeStamp', Time.now.to_i.to_s],
    # ['Version', '1.5'],
    # ['MerchantOrderNo', Time.now.to_i.to_s],
    # ['Amt', '93'],
    # ['ItemDesc', 'TEST'],
    # ['Email', '藍新回傳訊息的信箱'],
    # ['ReturnURL', "/cashflow/thankyou"]

    params_for_newbpay = params["for_newebpay"]
    applicant = params_for_newbpay["applicant"]
    order_number = params_for_newbpay["order_number"]

    if applicant
      # 受雇者押金 20%
      paying_amount = params_for_newbpay["reward"].to_f * 0.2
      #受雇者的訂單編號 + B
      order_number = order_number + "B"
    else
      paying_amount = params_for_newbpay["reward"].to_i + params_for_newbpay["behalf"].to_i
    end

    @data_for_newebpay = [
      ['MerchantID', 'MS119996394'],
      ['RespondType', 'String'],
      ['TimeStamp', Time.now.to_i.to_s],
      ['Version', '1.5'],
      ['MerchantOrderNo', order_number],
      ['Amt', paying_amount.to_s],
      ['ItemDesc', 'TEST'],
      ['Email', ENV["email_for_newebpay"]],
      ['ReturnURL' , ENV["web_https"] + "/cashflow/thankyou"],
      ['NotifyURL', ENV["web_https"] + "/cashflow/from_newebpay"]
    ]
  end

  def from_newebpay
    # newebpay_posted = params
    # 付款成功或失敗，藍新會傳一段大概如下的東西，就是上面的 params
    # Parameters: {
    #              "Status"=>"SUCCESS",
    #              "MerchantID"=>"MS119996394",
    #              "Version"=>"1.5",
    #              "TradeInfo"=>"3a597f44d8c5bb7c4d0f46a2c3afc1db3c42dc2199511ef3b8fa16b7c6e29b29dd8f1d9b771a2140f60cbea4fd028754c4d7a5f52814cfdf477ea8d18845835d778fac3b9067524b914fa95ab2f697b31fe7f88f8e1c2bc66a66fb25339f48a978129f80d8673d6d44d44ffbada78ff94dba5c4633476cb838167e62f2bd5adb02e2211c1489d26e2851269d79c3ec0607a98d473ceb29ee7f7799b405cb693b102c30499a0a831481ba03c81bb6f843afa1fa531c0a218bb68155bb108c190ab360e8ed7984bc93f4e8ad2ba5d63735403a92a786bfb6613e21047d54145a7ec6458ebac6e6143d6d64e0f72e54ee0679a9f48c7defb514d7dd11f64c107de5523ad9d47f76f4b8814fe3630fed99dce1229c4bb07542b52d6fe9b424ecf2fe3cac1d393ad7f2bcd061f42e2acbf14c00a84a971724ee4e1cf0c1051d05042d7d340d3c9ab42e6982aea5b21a7715ed2bd5e08a766b83140edfc3eb11c75421",
    #              "TradeSha"=>"33537B639A888D526D572A2997C255F0F3906ECD87FA18BF4BDA46877726F97A"
    #             }
    # 然後預計會解開如下
    # Status=SUCCESS&Message=%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%88%90%E5%8A%9F&MerchantID=MS119996394&Amt=200&TradeNo=21051417395389824&MerchantOrderNo=1620984982&RespondType=String&IP=61.220.182.115&EscrowBank=HNCB&PaymentType=WEBATM&PayTime=2021-05-14+17%3A40%3A02&PayerAccount5Code=12345&PayBankCode=00
    # 我們要抓的就是 MerchantOrderNo=1620984982 (task.order.merchant_order_number)
    status = params["Status"]
    trade_information = params["TradeInfo"]
    trade_sha256 = params["TradeSha"]

    key = ENV["newebpay_key"]
    iv = ENV["newebpay_iv"]

    # 解碼並更新付費狀態
    if status == "SUCCESS"
      result = aes_decrypt(trade_information, key, iv)
      result = result.split("&")[5]
      target_order_number = result.partition('=').last
      if target_order_number.include?("B")
        target_order_number.slice! "B"
        target_order = Order.find_by(merchant_order_number: target_order_number)
        task = Task.find_by(id: target_order.task_id)
        task.employee_pay
      else
        target_order = Order.find_by(merchant_order_number: target_order_number)
        task = Task.find_by(id: target_order.task_id)
        task.employer_pay
      end
      task.save
    end
  end

  def thankyou
    redirect_to tasks_path, notice: params['Status']
  end

  private

  def aes_decrypt(trade_information, key, iv)
    result = hex2bin(trade_information)
    openssl_decrypt(result, key, iv)
  end

  def hex2bin(hex)
    [hex].pack('H*')
  end

  def openssl_decrypt(string, key, iv, cipher_method = 'aes-256-cbc')
    cipher = OpenSSL::Cipher.new(cipher_method)
    cipher.decrypt
    cipher.iv = iv
    cipher.key = key
    cipher.update(string)
  end

  # def strippadding(string)
  #   slast = string[-1].ord
  #   slastc = slast.chr
  #   pcheck = string[-slast]
  #   if (string.match("/#{slastc}{#{slast}}/"))
  #     puts "============================"
  #     puts true
  #   else
  #     puts "============================"
  #     puts false
  #   end
  # end

end
