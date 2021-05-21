class Task < ApplicationRecord
  include AASM
  
  acts_as_paranoid
  has_one :qrcode
  belongs_to :user

  # 加上關聯，並作為選填
  belongs_to :employee, class_name: 'User', optional: true

  has_one :order
  has_one :room

  validates :brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, presence: true
  validate :buffer_time, :correct_time, :end_time, :reward_less

  # 阿美是雇主，小明是受僱者
  aasm column: :state do
    
    # 阿美創任務，任務 state 為 pending
    state :pending, initial: true

    state :employer_paid, :employee_applied, :employer_mailed, :employer_confirmed, :employee_paid, :deal

    state :employer_paid,
          # :employee_applied,
          # :employer_mailed,
          :employer_confirmed,
          :deal
    
    


    # 阿美匯款，任務 state 轉為 employer_paid，這時候這個任務會出現在其他人的頁面上，大家可以來應徵。有人點應徵，且該任務目前狀態還沒到 employer_confirm，就可以一直寄信給阿美
    event :employer_pay do
      transitions from: :pending, to: :employer_paid
    end

    # 阿美將會收到很多應徵信，但最後他只能確認一個，確認後，狀態轉為 employer_confirm，就會鎖定小明
    event :employer_confirm do
      transitions from: :employer_paid, to: :employer_confirmed
    end

    # 小明付完錢，訂單轉為成立
    event :employee_pay do
      transitions from: :employer_confirmed, to: :deal
    end
    
    # 訂單完成後，出現qrcode
    event :deal do
      transitions from: :employer_mailed, to: :deal
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
