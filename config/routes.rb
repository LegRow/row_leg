Rails.application.routes.draw do
  resources :tests, only: [:index]
  root "tests#index"

  resources :tasks
end
