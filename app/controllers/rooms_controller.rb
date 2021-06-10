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
    @message = Message.new
  end

  def tip
    ActionCable.server.broadcast "room_channel_#{params[:room_id]}", type: 'tip', user_id: current_user.id , user_name: current_user.name
    head :no_content #HTTP status code 200 無內容物
  end

  def tip_leave
    ActionCable.server.broadcast "room_channel_#{params[:room_id]}", type: 'tip_leave', user_id: current_user.id , user_name: current_user.name
    head :no_content #HTTP status code 200 無內容物
  end

  private

  def find_room
    begin
      @room = Room.find(params[:id])
    rescue
      redirect_to rooms_path
    end
  end

  def join_to_chat
    if current_user.id != @room.task.user.id && current_user.id != @room.task.employee_id
      redirect_to rooms_path, alert: "請勿隨意操作路徑！"
    end
  end
end
