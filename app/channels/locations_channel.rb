class LocationsChannel < ApplicationCable::Channel

  # 講一下邏輯
  # 在前端，employee 點回報位置按鈕，JS 會 call google map 的 callback，等到 google map 回傳 emplyee 位置
  # 後透過 actioncable JS 裡定義的 speak 將資料傳出去，至於要傳去哪裡？
  # subscribed 意思為用戶訂閱了哪些頻道，而我特意寫死在 params[:employeeId]，employeeId 是前端的
  # consumer.subscriptions.create({ channel: "LocationsChannel", employeeId: employeeId } 裡的 emplyeeId
  # 所以寫死後，speak 方法裡的 broadcast 就只能 broadcast 到這個 room
  # 接下來就是在前端判斷是不是該這個雇主接這個應徵者傳出的位置資訊

  def subscribed
    stream_from params[:employeeId]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # broadcast the message to received function of room_channel
    ActionCable.server.broadcast(params[:employeeId], { location: data["location"] })
  end
  
end
