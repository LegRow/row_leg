class HomeController < ApplicationController

  before_action :check_user_column, only: :index
  
  def index 
  end

  private
  # 使用者登錄後確認銀行帳戶欄位是否為空，是的話導到編輯頁面，第二次再進入首頁不會再跳轉
  def check_user_column
    return if current_user.blank?
    return if session[:visited_check].present?

    if current_user.bank_account.blank? || current_user.tel.blank?
      session[:visited_check] = true
      redirect_to edit_user_registration_path
    end
  end

end
