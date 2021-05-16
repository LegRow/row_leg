class QrcodesController < ApplicationController
  require 'rqrcode'

  def show
    @qr = RQRCode::QRCode.new(message)
  end

  private
  def message
  params[:messge].nil? ? 'http://127.0.0.1:3000/tasks' : params[:message]
  end
end
