Rails.application.routes.draw do
  get 'cashflow/index'
  post 'cashflow/thankyou'
  root 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }

  resources :tests, only: [:index]

  resources :tasks do
    put :approve
    put :disapprove
  end

end
