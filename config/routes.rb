Rails.application.routes.draw do
  get 'cashflow/index'
  post 'cashflow/thankyou'
  root 'tests#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks'}
  resources :tests, only: [:index]

  resources :tasks do
    put :approve
    put :disapprove
  end

end
