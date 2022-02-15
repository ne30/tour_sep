class LoginController < ApplicationController
    before_action :set_current_user
    # include CurrentUserConcern

    # def new
    # end
    def set_current_user
        if session[:user_id].present?
            puts session[:user_id].to_s + " here"
            @current_user = User.find(session[:user_id])
        end
    end

    def create
        user = User.find_by(user_name: params[:user_name])
        if user.present? && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {
                status: :created,
                logged_in: true,
                user: user
            }
        else
            render json: { status: 401 }
            # flash[:error] = "Invalid user name or password"
            # redirect_to sign_in_path
        end
    end

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def logout
        reset_session
        session[:user_id] = nil
        render json: {
            status: 200,
            logged_out: true
        }
        # session[:user_id] = nil
        # redirect_to sign_up_path, notice: "Logged Out"
    end
end