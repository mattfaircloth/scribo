class Api::V1::NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.all
    render json: @notebooks
  end

  def show
   @notebook = Notebook.find(params[:id])
   render json: @notebook
  end

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render json: @notebook
    else
      render json: {errors: @notebook.errors.full_messages}, status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])

    @notebook.update(notebook_params)
    if @notebook.save
      render json: @notebook
    else
      render json: {errors: @notebook.errors.full_messages}, status: 422
    end
  end

  def destroy
   @notebook = Notebook.find(params[:id])
   @notebook.destroy
   render json: {message:"Zap! Notebook deleted"}
  end



  private
  def notebook_params
    params.permit(:user_id, :lecture_id, :content)
  end
end
