class RoomsController < ApplicationController

  before_action :find_room, only: [:show]
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
      # @room = Room.new(room_params)
      # @room.save
      # redirect_to rooms_path
  end

  def show
    #擋不是雇主或乙方隨便進聊天室 方便測試 乙方完成後要解開
    # if current_user.id == @room.task.user.id
      @rooms = Room.all
      @message = @room.messages.new
      render 'index'
    # else 
      # redirect_to rooms_path
    # end  
  end

  private
  
  def find_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:name)
  end

end
