Rails.application.routes.draw do

  root 'home#index'
  
  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }
  
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages

  devise_for :users
  resources :tests, only: [:index]

  resources :tasks do
    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
    end
  end

end
