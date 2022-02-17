class RegistrationsController < ApplicationController
    def create
        user = User.new(userParams)
        if user.valid?
            user.save
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }, status: 200
        else
            render json: { status: :something_went_wrong }, status: 500
        end
    end

    private
    def userParams
        params.require(:user).permit(:user_name, :gender, :password, :password_confirmation)
    end
end