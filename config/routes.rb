Rails.application.routes.draw do

  root 'tasks#index'


  root 'home#index'

  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  

  resources :qrcodes, only: [:show]
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages
  resources :tests, only: [:index]

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }
  
  resources :lists, only: [:index]
  resources :works, only: [:index]
  
  resources :tasks do
    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
    end
  end
  #測試用等暫時用不上路徑
  resources :tests, only: [:index]
end
