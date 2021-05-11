Rails.application.routes.draw do
  get 'cashflow/index'
  devise_for :users
  resources :tests, only: [:index]
  root "tasks#index"

  resources :tasks
end
