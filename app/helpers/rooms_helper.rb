module RoomsHelper
  def user_room
    @room.task.user == current_user
  end

  def user_room?(room)
    room.task.user == current_user
  end

  def employee_room
    @room.task.employee_id == current_user.id
  end

  def employee_room?(room)
    room.task.employee_id == current_user.id
  end
end