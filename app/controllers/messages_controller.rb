class MessagesController < ApplicationController
  before_action :authenticate_user!

  def create
    @message = current_user.messages.create(message_params)
    SendMessageJob.perform_now(@message, current_user)
  end

  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end

end