class SendMessageJob < ApplicationJob
  queue_as :default
  #傳訊息帶資訊 資訊裡分有無使用者id 及請ActionCable廣播到指定頻道內
  def perform(message, current_user)
    mine = ApplicationController.render(
      partial: 'messages/message',
      locals: {message: message, current_user: current_user},
      )
    theirs = ApplicationController.render(
      partial: 'messages/message',
      locals: {message: message, current_user: nil},
      )

    ActionCable.server.broadcast "room_channel_#{message.room_id}", mine: mine, theirs: theirs, message: message, type: 'message', user_id: current_user.id
  end
end
