class User < ApplicationRecord

  has_many :tasks
  has_many :messages

  # validates :name, :age, presence: true
  # validates :tel, length: { minimum: 10, too_short: "請確實填寫！"}
  # validates :bank_account, length: { minimum: 10, too_short: "請再次確認帳戶號碼！" }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:github, :google_oauth2]

  def self.create_from_provider_data(provider_data)
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
      user.email = provider_data.info.email
      user.name = provider_data.info.name
      user.password = Devise.friendly_token[0, 20]
    end
  end
end
 