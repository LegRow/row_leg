class WorksController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @tasks = Task.all
  end
end
