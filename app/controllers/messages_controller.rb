class MessagesController < ApplicationController
  
  def index
    @messages = Message.all
    @message = Message.new
  end 

  def new
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    # @message.room_id = @room.id
    @message.save
    redirect_to request.referrer
  end

  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end
end
