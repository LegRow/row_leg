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

  def employer_confirmed(task)
    if task.state == "employer_confirmed"
    end
  end

  def employee_of(task)
    user_signed_in? && task.employee_id == current_user.id && task.employer_confirmed?
  end

  def over_end_time
    Time.now - @task.task_end > 1.hours && current_user.id == @task.employee_id
  end
end
