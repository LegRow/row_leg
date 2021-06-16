class Bill < ApplicationRecord
  belongs_to :task
  belongs_to :user

  def self.search(search)
    if search
      # 這是用時間來查找，如果功能上連年份都要來找，我在想是不是用多帶另一個參數就好，例如 self.search(year, month), time..time 是between方法
      # 至於大小月或2月28號，不管(新手特權)，反正正常來說你資料庫裡不會出現6/31或2/30
      # where(created_at: (Time.new(2021, search, 1))..Time.new(2021, search, 31))
      where('task_time LIKE ?', "%#{search}%")
    #   這是我最先的做法，自動建立bill時，把task_end的月份抓出來，存入資料庫，型態選string,因為LIKE方法比對的是字串
    else
      self.all
    end
  end

  def self.adminsearch(search)
    # bill的create時間是finish時間 所以等於任務完成時間
    if search
      where(created_at: (Time.new(2021, search, 1))..Time.new(2021, search, 31))
    else
      self.all
    end
  end
end
