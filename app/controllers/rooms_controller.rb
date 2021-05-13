class RoomsController < ApplicationController

  before_action :find_room, only: [:show]

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
    @room = Room.new(room_params)
    @room.save
    redirect_to rooms_path
  end

  def show
    @rooms = Room.all
    @message = @room.messages.new
    render 'index'
  end

  private
  
  def find_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:name)
  end
end
