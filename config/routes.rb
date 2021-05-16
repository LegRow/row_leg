Rails.application.routes.draw do

  root to: "tasks#index"

  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages

  devise_for :users

  resources :tasks do
    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
    end
  end

end
