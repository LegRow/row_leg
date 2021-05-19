class MessagesController < ApplicationController
  
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.save
    SendMessageJob.perform_now(@message, current_user)  
  end

  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end
  
end