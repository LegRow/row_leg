class TasksController < ApplicationController
  
  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to tasks_path, notice: '任務成功建立'
    else
      render :new
    end
  end

  def edit
    
  end

  def destroy

  end
  
  private

  def find_task
    @task = Task.find(params[:id])
  end

  def task_params
      params.require(:task).permit(:brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, :behalf, :task_at, :task_end, :remarks)
  end

end
