class Api::V1::LecturesController < ApplicationController
  def index
    @lectures = Lecture.all
    render json: @lectures
  end

  def show
   @lecture = Lecture.find(params[:id])
   render json: @lecture
  end

  def create
    @user = User.find(params[:admin_id])
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      @user.lectures << @lecture
      render json: @lecture
    else
      render json: {errors: @lecture.errors.full_messages}, status: 422
    end
  end

  def notebooks
    @notebooks = Lecture.find(params[:id]).notebooks
    render json: @notebooks
  end

  def users
    @users = Lecture.find(params[:id]).users
    render json: @users
  end

  def update
    @lecture = Lecture.find(params[:id])

    @lecture.update(lecture_params)
    if @lecture.save
      render json: @lecture
    else
      render json: {errors: @lecture.errors.full_messages}, status: 422
    end
  end

  def delete
   @lecture = Lecture.find(params[:id])
   @lecture.destroy
   render json: {message:"Zap! Lecture deleted"}
  end



  private
  def lecture_params
    params.permit(:title, :date_time, :admin_id)
  end
end
