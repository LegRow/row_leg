module RoomsHelper
  def user_room
    @room.task.user_id == current_user.id
  end

  def user_room_list(room)
    room.task.user_id == current_user.id
  end

  def row_leg_room
    @room.task.employee_id == current_user.id
  end

  def row_leg_room_list(room)
    room.task.employee_id == current_user.id
  end
end