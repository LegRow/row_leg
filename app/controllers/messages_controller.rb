class MessagesController < ApplicationController
  before_action :authenticate_user!
  # before_action :find_message, only:[:destroy, :edit]
  def create
    @message = current_user.messages.create(message_params)
    SendMessageJob.perform_now(@message, current_user)
    #send_helper在 app/jobs裡
  end

  # def destroy
  #   @message.destroy
  #   ActionCable.server.broadcast "room_channel_#{message.room_id}", message: @message, type: 'message'
  # end
  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end

  # def find_message
  #   begin
  #     @task = current_user.message.find(params[:id])
  #   rescue
  #     redirect_to rooms_path
  #   end
  # end
end