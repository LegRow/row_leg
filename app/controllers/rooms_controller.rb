class RoomsController < ApplicationController

  before_action :find_room, only: [:show]
  before_action :join_to_chat, only: [:show]
  before_action :authenticate_user!
  before_action :current_user, only: [:show]

  def index
    @rooms = Room.all
  end

  def new
    @room = Room.new
  end

  def create
  end

  def show
    #@message = @room.messages.new 這個寫法不知為何造成對話框內多一個空白
    @message = Message.new #這個寫法不會有多空白 但是變沒輸入又可以送出 用js處理了
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
      redirect_to rooms_path, alert: "很抱歉，請先創建任務！"
    end
  end
end
