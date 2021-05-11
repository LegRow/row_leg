require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "someone_apply_note" do
    let(:mail) { UserMailer.someone_apply_note }

    it "renders the headers" do
      expect(mail.subject).to eq("Someone apply note")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
