Rails.application.routes.draw do

  root 'tasks#index'

  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'

  devise_for :users
  resources :tests, only: [:index]

  resources :tasks do
  end

end
