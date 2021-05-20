class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # 目前設置 任務取消(手動/自動)聊天室自動關 所以不做設定了
  end
end
