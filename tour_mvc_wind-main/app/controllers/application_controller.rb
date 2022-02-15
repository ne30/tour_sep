class ApplicationController < ActionController::Base
    # before_action :setCurrentUser
    skip_before_action :verify_authenticity_token

    def setCurrentUser
        if session[:user_id]
            Current.user = User.find_by(id: session[:user_id])
        end
    end
end
