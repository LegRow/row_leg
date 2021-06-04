class Task < ApplicationRecord
  include AASM

  acts_as_paranoid
  has_one :qrcode
  belongs_to :user

  # 加上關聯，並作為選填
  belongs_to :employee, class_name: 'User', optional: true

  has_one :order
  has_one :room

  after_create :create_room_and_order
  after_destroy :destroy_room

  geocoded_by :address
  after_validation :geocode, if: :address_changed?

  validates :brief_description, presence: true
  validates :description, presence: true
  validates :address_city, presence: true
  validates :address_district, presence: true
  validates :address_street, presence: true
  validates :store_name, presence: true
  validates :reward, presence: true

  validate :correct_time, :end_time, :reward_less
  validate :buffer_time, on: :create

  # 阿美是雇主，小明是受僱者
  aasm column: :state do

    # 阿美創任務，任務 state 為 pending
    state :pending, initial: true

    state :employer_paid,
          :employer_confirmed,
          :employee_paid,
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
      transitions from: :employer_confirmed, to: :employee_paid
    end

    # 訂單完成後，出現qrcode
    event :finish do
      transitions from: :employee_paid, to: :deal
    end
  end

  def address
    [address_city, address_district, address_street].join
  end

  def address_changed?
    address_city_changed? || address_district_changed? || address_street_changed?
  end

  private
  #後來發現pending?沒法判斷  因為任務就還沒有建立 沒有狀態
  def buffer_time
    if task_at < 3.hours.from_now
      errors.add(:task_at, '任務需離現在大於三小時')
    end
  end

  def correct_time
    if task_at > task_end
      errors.add(:task_at, "結束時間請在開始時間之後....")
    end
  end

  def end_time
    if  (task_end - task_at) < 1.hours
      errors.add(:task_end, "結束時間需與起始時間最少相距一小時")
    end
  end

  def reward_less
    task_duration = ((task_end - task_at) / 1.hour).round
    if reward.blank? || reward < task_duration * 200
      errors.add(:reward, "酬勞一小時最少200元")
    end
  end

  def send_email_to_employer
    puts "send mail" # 確定會 call 這個 function，之後再寫
    # user = User.find.where(Task.id: params[])
    # UserMailer.someone_apply_note(user)
    # flash[:notice] = "Email has been sent."
  end

  def create_room_and_order
    @room = self.create_room
    #訂單連動未做
  end

  def destroy_room
    self.room.messages.destroy_all
    self.room.destroy
  end

  def self.search(search)
    if search
        where(['address_district LIKE ? OR store_name LIKE ?', "%#{search}%", "%#{search}%"])
    else
        includes([:user], [:order])
    end
  end
end
