module MessagesHelper
  def my_message(message)
    message.user == current_user
  end
  ##其實展示請大家都上傳一張圖就好 以防萬一 還是做沒上傳過就不顯示
  def show_cover(message)
    message.user != current_user && current_user.cover.attached?
  end
end