class MessagesController < ApplicationController
  
  def index
    @messages = Message.all
  end

  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.save
    
    # html = render(
    #   partial: 'messages/message',
    #   locals: { message: @message }
    # )

    # ActionCable.server.broadcast "room_channel_#{@message.room_id}", html: html
    SendMessageJob.perform_now(@message, current_user)
    
  end

  def show
    @message = Message.find(params[:id])
  end

  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end
end