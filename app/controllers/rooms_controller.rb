class RoomsController < ApplicationController

  before_action :find_room, only: [:show]
  before_action :join_to_chat, only: [:show]
  before_action :authenticate_user!
  before_action :current_user, only: [:show]

  def index
    @rooms = Room.includes(task: [:user, :employee])
  end

  def new
    @room = Room.new
  end

  def create
  end

  def show
    #@message = @room.messages.new 這個寫法不知為何造成對話框內多一個空白
    @message = Message.new
  end
  # 自定義傳送事件方法 給app/javascript/controllers/caht_controller.js用
  # ActionCable.server.broadcast即為廣播 房號後可帶所需資訊。type為命名慣例
  def tip
    ActionCable.server.broadcast "room_channel_#{params[:room_id]}", type: 'tip', user_id: current_user.id
    head :no_content #HTTP status code 200 無內容物
  end

  private

  def find_room
    #為了防止使用者輸入還不存在的rooms/id
    begin
      @room = Room.find(params[:id])
    rescue
      redirect_to rooms_path
    end
  end

  def join_to_chat
    #只有甲方乙方能進聊天室
    if current_user.id != @room.task.user.id && current_user.id != @room.task.employee_id
      redirect_to rooms_path, alert: "請勿隨意操作路徑！"
    end
  end
end
