class TasksController < ApplicationController
  
  before_action :find_task, only:[:show, :edit, :update, :destroy]

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

  def update
    if @task.update(task_params)
      redirect_to task_path(@task), notice: '成功修改資料'
    else
      render :edit
    end
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
