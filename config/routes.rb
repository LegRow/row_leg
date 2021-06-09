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
  resources :tasks do
    collection  do
      get :mytasks
      get :myworks
    end

    member do
      get 'confirm_applicant'
      get 'send_applicant_apply_email'
      get 'qrcode'
      get 'finish_show'
      get 'employer_missing'
      post :finish
    end
  end

  get "/about_us" , to: "pages#about_us"
  get "/questions" , to: "pages#questions"
  get "/services" , to: "pages#services"
  get "/partner", to: "pages#partner"
end
