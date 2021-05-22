class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message, current_user)
    mine = ApplicationController.render(
      partial: 'messages/message',
      locals: {message: message, current_user: current_user}
      )
    theirs = ApplicationController.render(
      partial: 'messages/message',
      locals: {message: message, current_user: nil}
      )

    ActionCable.server.broadcast "room_channel_#{message.room_id}", mine: mine, theirs: theirs, message: message
  end
end
