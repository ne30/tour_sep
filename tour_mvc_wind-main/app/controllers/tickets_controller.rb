class TicketsController < ApplicationController
    # before_action :checkUser

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

    def showUserTickets 
        user = User.find_by(user_name: params[:user_name])
        user_tickets = user.tickets
        render json: TicketSerializer.new(user_tickets).serialized_json
    end

    def showAllTickets
        all_tickets = Ticket.all
        render json: TicketSerializer.new(all_tickets).serialized_json
    end

    def cancelTicket
        ticket_to_cancel = Ticket.find(params[:param])
        user = ticket_to_cancel.user
        tour = ticket_to_cancel.tour
        
        if ticket_to_cancel.companion_user_name.present?
            available_companion = tour.companions.find_by(gender:user.gender)

            companion_ticket = Ticket.find_by(user_id: User.find_by(user_name: ticket_to_cancel.companion_user_name).id, tour_id: tour.id)

            if available_companion.present?
                available_companion_ticket = Ticket.find(available_companion.ticket_id)
                available_companion_ticket.companion_user_name = ticket_to_cancel.companion_user_name
                available_companion_ticket.save

                companion_ticket.companion_user_name = available_companion.user.user_name
                companion_ticket.save

                available_companion.delete
            else
                companion_ticket.companion_user_name = nil
                companion_ticket.save

                companion_to_add = Companion.new
                companion_to_add.gender = user.gender
                companion_to_add.tour_id = tour.id
                companion_to_add.user_id = companion_ticket.user.id
                companion_to_add.ticket_id = companion_ticket.id
                companion_to_add.save
            end
        else
            available_companion = tour.companions.find_by(gender:user.gender)
            if available_companion.present?
                if available_companion.user.eql?(user)
                    available_companion.delete
                end                
            end
        end
        ticket_to_cancel.delete
        tour.passenger_limit = tour.passenger_limit + 1
        tour.save
        render json: {
            status: :deleted,
            ticket_deleted: true
        }
        # flash[:success] = "Successfully Cancelled Ticket for " + tour.tour_code.to_s
        # redirect_to tickets_path
    end
end