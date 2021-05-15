Rails.application.routes.draw do
  get 'cashflow/index'
  post 'cashflow/thankyou'
  root 'tests#index'
  resources :rooms, only: [:index, :new, :create, :show]
  resources :messages
  devise_for :users
  resources :tests, only: [:index]

  resources :tasks do
    put :approve
    put :disapprove
  end

end
