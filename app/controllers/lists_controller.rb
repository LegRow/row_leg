class ListsController < ApplicationController
  # before_action :authenticate_user!
  #看自己發布的任務 可以考慮跟works合併
  def index
    @tasks = Task.all
  end
end
