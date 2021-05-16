class TasksController < ApplicationController
  before_action :find_task, only:[:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
    @order = Order.new
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = current_user.id

    if @task.save
      
      #-----自動建立此任務專屬聊天室----
      @room = Room.new(room_params)
      @room.task_id = @task.id 
      @room.name = @task.store_name
      @room.save
      redirect_to tasks_path
      #-----自動建立此任務專屬聊天室----

      # order = Order.new(order_params)
      # order.task_id = @task.id
      # order.save

      # redirect_to controller: 'cashflow', action: 'to_newebpay',
      #   for_newebpay: {reward: @task.attributes["reward"], behalf: @task.attributes["behalf"], order_number: order.attributes["merchant_order_number"]}

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
    @room = @task.room
    @task.destroy
    @room.destroy
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
    params.require(:task).permit(:id, :name)
  end

  def order_params
    params.require(:task).permit(:merchant_order_number)
  end  


end
