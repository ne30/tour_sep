class LoginController < ApplicationController
    before_action :set_current_user
    
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
            }, status: 200
        else
            render json: { status: :not_logged_in }, status: 401
        end
    end

    def is_admin
        user = User.find_by(user_name: params[:user_name])
        if user.present? && user.is_admin
            render json:{
                is_admin: true
            }
        else
            render json:{
                is_admin: false
            }
        end
    end

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }, status: 200
        else
            render json: {
                logged_in: false
            }, status: 401
        end
    end

    def logout
        reset_session
        session[:user_id] = nil
        render json: {
            status: 200,
            logged_out: true
        }, status: 200
    end
end