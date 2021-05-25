class RoomsController < ApplicationController

  before_action :find_room, only: [:show]
  before_action :join_to_chat, only: [:show]
  before_action :authenticate_user!
  before_action :current_user, only: [:show]

  def index
    @rooms = Room.all
  end

  def show
    @message = @room.messages.new
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
      redirect_to rooms_path
    end
  end
end
