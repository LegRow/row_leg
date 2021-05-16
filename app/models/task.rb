class Task < ApplicationRecord
  include AASM
  
  acts_as_paranoid

  belongs_to :user
  has_one :order
  has_one :room

  validates :brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, presence: true
  validate :buffer_time, :correct_time, :end_time, :reward_less

  aasm column: :state do
    state :pending, initial: true
    state :employer_paid, :employee_applied, :employer_mailed, :employer_confirmed, :employee_paid, :deal

    event :deal do
      transitions from: :employer_mailed to: :deal
    end


    event :employer_pay do
      transitions from: :pending, to: :employer_paid
    end

    event :employee_apply, after: :send_email_to_employer do
      transitions from: :employer_paid, to: :employee_applied
    end

    event :mail_to_employer do
      transitions from: :employee_applied, to: :employer_mailed
    end

    event :employer_confirm do
      transitions from: :employer_mailed, to: :employee_paid
    end



  end
  
  def address
    [address_city, address_district, address_street].join
  end

  private

  def buffer_time
    buffer_time = (task_at) - (Time.now)
    if buffer_time < 10800
      errors.add(:task_at, "任務必須距離現在大於三小時")
    end
  end

  def correct_time
    if task_at > task_end
      errors.add(:task_at, "結束時間請在開始時間之後....")
    end
  end

  def end_time
    end_time = (task_end - task_at)
    if  end_time < 3599
      errors.add(:task_end, "結束時間需與起始時間最少相距一小時")
    end
  end

  def reward_less
    if  reward == nil || reward < ((task_end - task_at)/3600).round * 200 
      errors.add(:reward, "酬勞一小時最少200元")
    end
  end

  def send_email_to_employer
    puts "send mail" # 確定會 call 這個 function，之後再寫
    # user = User.find.where(Task.id: params[])
    # UserMailer.someone_apply_note(user)
    # flash[:notice] = "Email has been sent."
  end

end
