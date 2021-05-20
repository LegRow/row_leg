class WorksController < ApplicationController
  before_action :authenticate_user!

  def index
    @tasks = Task.where( employee_id: current_user.id)
  end
end
