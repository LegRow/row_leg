module TasksHelper
  
  def employer_of(resource)
    user_signed_in? && resource.user_id == current_user.id
  end

  def not_employer_of(resource)
    # 因為還是要有 user_siged_in，所以新增這個方法
    user_signed_in? && resource.user_id != current_user.id
  end

  def employer_paid(task)
    if task.state == "employer_paid"
    end
  end

end
