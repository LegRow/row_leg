class TasksController < ApplicationController
  before_action :find_task, only:[:edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @tasks = Task.all
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
      redirect_to controller: 'cashflow',
                  action: 'to_newebpay',
                  for_newebpay: {
                    reward: @task.reward,
                    behalf: @task.behalf,
                    order_number: @task.order.merchant_order_number
                  }
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
    employer_id = params["apply_information"]["employer_id"]
    @employer = User.find_by(id: employer_id)
    # 獲得應徵者
    applicant_id = params["apply_information"]["applicant_id"]
    @applicant = User.find_by(id: applicant_id)
    # 獲得此 task
    task_id = params["apply_information"]["task_id"]
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


  private
  def find_task
    begin
      @task = current_user.tasks.find(params[:id])
    rescue
      redirect_to tasks_path
    end
  end

  def task_params
    params.require(:task).permit(:brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, :behalf, :task_at, :task_end, :remarks)
  end

  def order_params
    params.require(:task).permit(:merchant_order_number)
  end

end
