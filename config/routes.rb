Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }

  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  
  resources :qrcodes, only: [:show]
  resources :rooms, only: [:index, :new, :create, :show]

  resources :tests, only: [:index]
  resources :messages, only: [:create]
  
  resources :lists, only: [:index]
  resources :works, only: [:index]


  resources :tasks do
    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
    end
  end
  
  get "/about_us" , to: "pages#about_us"

  get "/questions" , to: "pages#questions"

  get "/customer_severs" , to: "pages#customer_severs"


end
