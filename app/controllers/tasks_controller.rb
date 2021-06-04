class TasksController < ApplicationController
  before_action :find_task, only:[:edit, :update, :destroy, :qrcode]
  before_action :authenticate_user!, except: [:index]
  before_action :find_employee, only: [:finish_show, :finish]

  def index
    @tasks = Task.search(params[:search])
  end

  def mytasks
    @tasks = current_user.tasks
  end

  def myworks
    @tasks = current_user.works
  end

  def show
    @task = Task.find(params[:id])
  end

  def new
    @task = Task.new
    @order = Order.new
  end

  def create
    @task = current_user.tasks.new(task_params)

    if @task.save
      order = @task.create_order(order_params)
      # 等到有人應徵，就寄出通知信
      # SomeoneApplyTaskNoticeJob.perform_later(@task)
      # 直接跳轉去付款頁面
      redirect_to cashflow_to_newebpay_path(
        reward: @task.reward,
        behalf: @task.behalf,
        order_number: @task.order.merchant_order_number
      )
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

  def send_applicant_apply_email
    # 獲得雇主
    employer_id = params["employer_id"]
    @employer = User.find_by(id: employer_id)
    # 獲得應徵者
    applicant_id = params["applicant_id"]
    @applicant = User.find_by(id: applicant_id)
    # 獲得此 task
    task_id = params["task_id"]
    @task = Task.find_by(id: task_id)
    # 寄信通知雇主
    UserMailer.someone_apply_note(@employer, @applicant, @task).deliver_now
    # 告知預計受僱者，目前任務正在等雇主確認
    redirect_to tasks_path, notice: '您的應徵資訊已經告知雇主，請耐心等候通知'
  end

  def confirm_applicant
    # 更新該 task 狀態為 employer_confirmed
    task_id = params["confirm_employee"]["task_id"]
    task = Task.find_by(id: task_id)
    task.employer_confirm
    task.save

    # 將 employee 寫入
    employee = User.find_by(id: params[:confirm_employee][:applicant])
    task.employee = employee
    task.save

    # 寄信通知受雇者，參數task就能拿到所有資料
    UserMailer.employer_confirm_note(task).deliver_now

    # 告知雇主，目前任務正在等受雇者付押金
    redirect_to tasks_path, notice: '已發送確認通知信給受雇者，待受雇者支付押金後，則表示成功承接'
  end
  #轉網址帶資料
  def qrcode
    @task_url = finish_show_task_url(@task)
  end
  #我先用醜的寫法
  def finish_show
    if current_user.id == @task.employee_id
      render :finish_show
    else
      render 'error', locals: { message: '非任務承接者' }
    end
  end

  def finish
  #這是post不用擋 狀態也不用去判斷 因為永哲有設定 只有:employee_paids能變deal
  #提醒試試用js來做吧
    if @task.finish!
      render :finish
    else
      redirect_to tasks_path
    end
  end

private
  def find_task
    begin
      @task = current_user.tasks.find(params[:id])
    rescue
      redirect_to tasks_path
    end
  end

  def find_employee
    begin
      @task = Task.where(employee_id: current_user.id).find(params[:id])
    rescue
      render 'error', locals: { message: '非任務承接者' }
    end
  end

  def task_params
    params.require(:task).permit(:brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, :behalf, :task_at, :task_end, :remarks, :latitude, :longitude, :buffer_time)
  end

  def order_params
    params.require(:task).permit(:merchant_order_number)
  end
end
