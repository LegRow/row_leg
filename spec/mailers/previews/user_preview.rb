# Preview all emails at http://localhost:3000/rails/mailers/user
class UserPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user/someone_apply_note
  def someone_apply_note
    UserMailer.someone_apply_note
  end

end
