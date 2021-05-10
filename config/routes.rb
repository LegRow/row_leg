Rails.application.routes.draw do
  devise_for :users
  resources :tests, only: [:index]
  root "tests#index"
end
