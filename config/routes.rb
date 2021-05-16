Rails.application.routes.draw do
  root 'tests#index'
  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages

  devise_for :users
  resources :tests, only: [:index]

  resources :tasks do
  end

end
