class ApplicationController < ActionController::Base

  # def current_user
  #   return @current_user if @current_user.present?

  #   if session[:user_id].present?
  #     @current_user = User.find(session[:user_id])
  #   else
  #     @current_user = User.generate
  #     session[:user_id] = @current_user
  #     @current_user
  #   end
  # end
end
