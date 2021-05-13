class TasksController < ApplicationController
  before_action :find_task, only:[:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def index
    if user_signed_in?
      @tasks = Task.where.not(user_id: current_user.id)
    else
      @tasks = Task.all
    end
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = current_user.id

    if @task.save
      room = Room.new(room_params)
      task.store_name = room.name
      redirect_to cashflow_index_path, notice: '任務成功建立'
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
    @task.destroy
    redirect_to tasks_path, notice: '任務已刪除'
  end

  private
  def find_task
    @task = Task.find(params[:id])
  end

  def task_params
      params.require(:task).permit(:brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, :behalf, :task_at, :task_end, :remarks)
  end

  def room_params
    params.require(:task).permit(:brief_description)
  end

end
