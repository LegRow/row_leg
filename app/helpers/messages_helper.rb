module MessagesHelper
  def my_message(message)
    message.user == current_user
  end
end