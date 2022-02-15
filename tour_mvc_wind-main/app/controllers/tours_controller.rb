class ToursController <  ApplicationController
    # before_action :checkUser
    protect_from_forgery with: :null_session
    
    def checkUser
        if session[:user_id].present?
            if User.exists?session[:user_id]
                @user = User.find(session[:user_id])
            else
                redirect_to sign_up_path, notice: "Login Please"
            end
        else
            redirect_to sign_up_path, notice: "Logged Out"
        end
    end

    def new
    end

    def create
        @new_tour = Tour.new(tourParams)
        if @new_tour.save
            flash[:success] = "Successfully added tour " + @new_tour.tour_code.to_s
            redirect_to tours_path
        else
            flash[:error] = "Something went wrong while adding the tour."
            redirect_to add_tour_path
        end
    end

    def showAllTour
        @tours = Tour.all
        @tickets = Ticket.all
        # puts @tours[0]
        render json: TourSerializer.new(@tours).serialized_json
    end

    def showTour
        # puts params
        chosen_tour = Tour.find(params[:tour_id])
        render json: TourSerializer.new(chosen_tour).serialized_json
    end

    def bookTicketWithoutCompanion
        tour = Tour.find(params[:param])
        user = User.find(session[:user_id])
        if tour.passenger_limit == 0
            flash[:error] = "Tour is completely booked!"
            redirect_to tours_path
        else
            new_ticket = Ticket.new
            new_ticket.user_id = user.id
            new_ticket.tour_id = tour.id

            new_ticket.save
            flash[:success] = "Successfully Booked Ticket for " + tour.tour_code.to_s
            tour.passenger_limit = tour.passenger_limit - 1
            tour.save
            redirect_to tours_path
        end
    end

    def bookTicketWithCompanion
        tour = Tour.find(params[:param])
        user = User.find(session[:user_id])
        
        if tour.passenger_limit == 0
            flash[:error] = "Tour is completely booked!"
            redirect_to tours_path
        else
            new_ticket = Ticket.new
            new_ticket.user_id = user.id
            new_ticket.tour_id = tour.id

            if Companion.find_by(tour_id: tour.id, gender: user.gender).present?
                companion_to_remove = Companion.find_by(tour_id: tour.id, gender: user.gender)
                
                ticket_to_update = Ticket.find(companion_to_remove.ticket_id)
                ticket_to_update.companion_user_name = user.user_name
                ticket_to_update.save

                new_ticket.companion_user_name = User.find(companion_to_remove.user_id).user_name
                new_ticket.save
                companion_to_remove.delete
            else
                companion_to_add = Companion.new
                
                new_ticket.save
                
                companion_to_add.gender = user.gender
                companion_to_add.tour_id = tour.id
                companion_to_add.user_id = user.id
                companion_to_add.ticket_id = new_ticket.id
                companion_to_add.save
            end
            flash[:success] = "Successfully Booked Ticket for " + tour.tour_code.to_s
            tour.passenger_limit = tour.passenger_limit - 1
            tour.save
            redirect_to tours_path
        end
    end

    private 
    def tourParams
        params.permit(:tour_code, :from, :to, :start_time, :end_time, :passenger_limit, :price, :date)
    end
end