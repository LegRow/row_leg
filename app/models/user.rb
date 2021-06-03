class User < ApplicationRecord

  has_many :tasks
  has_many :works , class_name: 'Task', foreign_key: 'employee_id'
  has_many :messages
  has_many :rooms ,through: :messages
  has_one_attached :cover
  validates :cover, content_type: [:png, :jpg, :jpeg]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:github, :google_oauth2]

  def self.create_from_provider_data(provider_data)
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
      user.email = provider_data.info.email
      user.name = provider_data.info.name || "會員"
      user.bank_account = "未填寫"
      user.tel = "未填寫"
      user.password = Devise.friendly_token[0, 20]
    end
  end

  def not_qualified?
    bank_account.blank? || tel.blank?
  end
end