class Api::V1::AuthController < ApplicationController
  before_action :authorize_user!, only: [:show]

  def show
    render json: {
      id: current_user.id,
      name: current_user.name
    }
  end

  def create
    # see if there is a user with this username
    user = User.find_by(name: params[:name])
    # if there is, make sure that they have the correct password
    if user.present? && user.authenticate(params[:password])
      # if they do, render back a json response of the user info
      # issue token
      created_jwt = issue_token({id: user.id})
      render json: {name: user.name, jwt: created_jwt}
    else
      # otherwise, render back some error response
      render json: {
        error: 'Name or Password is Incorrect.<br />Try again or Sign Up below!'
      }, status: 403
    end
  end
end
