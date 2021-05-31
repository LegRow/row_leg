require 'rails_helper'

RSpec.describe "newebpay" do

  include Capybara::DSL

  let(:params) do
    {
    "Status"=>"SUCCESS",
    "MerchantID"=>"MS119996394",
    "Version"=>"1.5",
    "TradeInfo"=>"62cff73d959a9296af4e1cb51de6514fa569f7875a2d52abf0afd53d725f7f9810d71ab542981e12b708d2e1ea25d1cb0768078886297c0dd4cc3483d9c11bb58ab3015d557a56bfd26a5946d017ae3c092e701ca7436c00e287ebfd03d3c35cc9517360f0d21c622e71749498a15318f05a53e9dde14dbf60815015018177357acc3a5397ba23fdae26cce6b90f0276670a5ebfb9711aaa69ad541ec01784d2b26812ed25e09d1f4e1b0681c36fcd06332e3ba593501c70cb8c2fb207e0c3237ca10ba648db51989430fedd9263bb7cab59771855904f0f27ccc040ae45157fe2a58b0a2652c17b006de3559e2745de59a8d2b0e93fdf7f0c22283496c3d048beb2f83764a285b4cba2876aa1b37ac8fbddb3ccbd6753eb37d0dd414f99c0e9251b5790574659465ccb4fd45143d0de740969af9fa7059769c20ba43bdea70b",
    "TradeSha"=>"365BDFD74B7B23BA012E77165A57361634742B15DBDD3F4666DC01290C4C0991"
    }
  end

  context "when params from newebpay" do
    it "successfully decodes" do
      Newebpay.decode(params).should == "1622367072"
    end
  end

  context "when params to newebpay" do
  end

end
