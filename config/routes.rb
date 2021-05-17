Rails.application.routes.draw do
  #會員相關路徑
  devise_for :users
  #金流相關路徑
  get 'cashflow/to_newebpay'
  post 'cashflow/thankyou'
  post 'cashflow/from_newebpay'
  #聊天室相關路徑
  resources :rooms, only: [:index, :show]
  resources :messages, only: [:index, :new, :create]
  #任務列表相關路徑
  resources :tasks do
  end
  #測試用等暫時用不上路徑
  resources :tests, only: [:index]
end
