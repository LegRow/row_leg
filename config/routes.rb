Rails.application.routes.draw do
<<<<<<< HEAD
  root 'home#index'
=======

  #會員相關
>>>>>>> develop
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }
  #金流相關
  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  resources :qrcodes, only: [:show]
  #首頁相關
  root 'home#index'
  resources :aboutus, only: [:index]
  resources :questions, only: [:index]
  #任務頁面相關
  resources :rooms, only: [:index, :new, :create, :show]
<<<<<<< HEAD

  resources :tests, only: [:index]
=======
  resources :cussevers, only: [:index]
>>>>>>> develop
  resources :messages, only: [:create]
  resources :lists, only: [:index]
  resources :works, only: [:index]

  resources :tasks do
    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
    end
  end
<<<<<<< HEAD
  
  get "/about_us" , to: "pages#about_us"

  get "/questions" , to: "pages#questions"

  get "/customer_severs" , to: "pages#customer_severs"


=======
>>>>>>> develop
end
