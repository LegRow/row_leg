class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message, current_user)
    html = ApplicationController.render(
      partial: 'messages/message', 
      locals: {message: message, current_user: current_user} 
      )
    others = ApplicationController.render(
      partial: 'messages/message', 
      locals: {message: message, current_user: nil} 
      )

    ActionCable.server.broadcast "room_channel_#{message.room_id}", mine: html, theirs: others, message: message
  end
end 
