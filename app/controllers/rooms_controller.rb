class RoomsController < ApplicationController

  before_action :find_room, only: [:show]
  before_action :join_to_chat, only: [:show]
  before_action :authenticate_user!
  before_action :current_user, only: [:show]

  def index
    @rooms = Room.all
    @room = Room.new
    @message = Message.new
    @messages = Message.all
  end

  def new
    @room = Room.new
  end

  def create
  end

  def show
      # @rooms = Room.joins(:task).where(tasks: { user_id: current_user,   employee_id: employee_id })
      @rooms = Room.all
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
