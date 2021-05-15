Rails.application.routes.draw do

  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  root 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }

  post 'cashflow/from_newebpay'
  
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages

  resources :tests, only: [:index]

  resources :tasks do
  end

end
