class TicketsController < ApplicationController
    def showUserTickets 
        user = User.find_by(user_name: params[:user_name])
        if user.present?
            user_tickets = user.tickets
            render json: TicketSerializer.new(user_tickets).serialized_json, status: 200
        else
            render json:{
                status: "unauthorized"
            }, status: 401
        end
    end

    def showAllTickets
        all_tickets = Ticket.all
        render json: TicketSerializer.new(all_tickets).serialized_json, status: 200
    end

    def cancelTicket
        if Ticket.exists?(params[:param])
            ticket_to_cancel = Ticket.find(params[:param])
            obtained_json = ticket_to_cancel.cancelTicket

            render json: obtained_json, status: 200
        else
            render json:{
                status: :invalid_ticket,
                ticket_deleted: false
            }, status: 404
        end
    end
end