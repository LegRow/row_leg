class QrcodesController < ApplicationController
  require 'rqrcode'

  def show
    @qr = RQRCode::QRCode.new(message)
  end

  private
  def message
  params[:messge].nil? ? '交易完成' : params[:message]
  end
end
