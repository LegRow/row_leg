class User < ApplicationRecord

  has_many :tasks

  validates :name, :age, presence: true
  validates :tel, length: { minimum: 10, too_short: "請確實填寫！"}
  validates :bank_account, length: { minimum: 10, too_short: "請再次確認帳戶號碼！" }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
