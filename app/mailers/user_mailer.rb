class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.someone_apply_note.subject
  #
  def someone_apply_note(employer, applicant, task)
    @employer = employer
    @applicant = applicant
    @task = task
    mail to: employer.email, subject: "row leg：有人應徵你的職缺"
  end
end
