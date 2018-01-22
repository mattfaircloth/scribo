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
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      render json: @lecture
    else
      render json: {errors: @lecture.errors.full_messages}, status: 422
    end
  end

  def notebooks
    @notebooks = Lecture.find(params[:id]).notebooks
    render json: @notebooks
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
    params.permit(:title, :date_time)
  end
end
