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
      #目前聊天室建立與task連動 如之後沒要手動開聯天室可刪
      # @room = Room.new(room_params)
      # @room.save
      # redirect_to rooms_path
  end

  def show
    # 擋不是雇主或乙方隨便進已存在聊天室 目前方便測試先關 乙方完成後要解開
    # if current_user.id == @room.task.user.id || curremt_user.id = task.接單者.id
      @rooms = Room.all
      @message = @room.messages.new
      render 'show'
    # else 
    #   redirect_to rooms_path
    # end  
  end

  private
  
  def find_room
    #為了防止使用者輸入還不存在的rooms/id
    if Room.exists?(params[:id])
      @room = Room.find(params[:id])
    else
      redirect_to rooms_path
    end
  end

  def room_params
    params.require(:room).permit(:name)
  end

end
