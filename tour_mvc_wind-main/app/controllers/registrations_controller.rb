class RegistrationsController < ApplicationController
    # def new
    #     @user = User.new
    # end

    def create
        user = User.create!(userParams)
        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
            # flash[:success] = "Successfully created account"
            # redirect_to sign_in_path
        else
            render json: { status: 500 }
            # flash[:error] = "Something went wrong"
            # redirect_to sign_up_path
        end
    end

    private
    def userParams
        params.require(:user).permit(:user_name, :gender, :password, :password_confirmation)
    end
end