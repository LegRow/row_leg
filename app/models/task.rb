class Task < ApplicationRecord
  
  acts_as_paranoid
  validates :brief_description, :description, :address_city, :address_district, :address_street, :store_name, :reward, presence: true
  belongs_to :user
  validate :buffer_time, :correct_time, :end_time, :reward_less
  
  
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
end
