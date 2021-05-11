class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.someone_apply_note.subject
  #
  def someone_apply_note
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
