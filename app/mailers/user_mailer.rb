class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.someone_apply_note.subject
  #
  def someone_apply_note(user)
    @greeting = "您的任務有人應徵"
    email_address = user.email
    mail to: email_address
  end
end
