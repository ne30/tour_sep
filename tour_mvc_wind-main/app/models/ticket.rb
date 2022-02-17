class Ticket < ApplicationRecord
    belongs_to :user
    belongs_to :tour

    def cancelTicket()
        user = self.user
        tour = self.tour
        
        if self.companion_user_name.present?
            available_companion = tour.companions.find_by(gender:user.gender)

            companion_ticket = Ticket.find_by(user_id: User.find_by(user_name: self.companion_user_name).id, tour_id: tour.id)

            if available_companion.present?
                available_companion_ticket = Ticket.find(available_companion.ticket_id)
                available_companion_ticket.companion_user_name = self.companion_user_name
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
        self.delete
        tour.passenger_limit = tour.passenger_limit + 1
        tour.save
        return {
            "status" => "deleted",
            "ticket_deleted" => true
        }
    end
end
