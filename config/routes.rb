Rails.application.routes.draw do
  root 'tasks#index'
  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  
  resources :qrcodes, only: [:show]
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages
  resources :cussevers, only: [:index]
  devise_for :users
  resources :tests, only: [:index]

  resources :tasks do
  end

end
