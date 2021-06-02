Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations'
  }

  #金流相關
  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'


  #任務頁面相關
  resources :rooms, only: [:index, :new, :create, :show] do
    get 'tip' #建立一個讓前端打資訊到後端的通道
  end
  resources :messages, only: [:create]
  resources :works, only: [:index]

  resources :tasks do
    collection  do
      get :lists
    end

    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
      get 'qrcode_show'
      get 'finish_show'
      post :finish
    end
  end

  get "/about_us" , to: "pages#about_us"
  get "/questions" , to: "pages#questions"
  get "/customer_severs" , to: "pages#customer_severs"
  get "/partner", to: "pages#partner"
end
