Rails.application.routes.draw do
  resources :messages
  resources :rooms, path: '/rooms/index'
  devise_for :users
  resources :tests, only: [:index]
  root "tests#index"

  resources :tasks
end
