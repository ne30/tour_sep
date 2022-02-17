class Tour < ApplicationRecord
    has_many :tickets
    has_many :companions
    validates :tour_code, presence: true, uniqueness:true
    validates :from, presence: true
    validates :to, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
    validates :passenger_limit, presence: true, numericality: { greater_than: 0 } 
    validates :price, presence: true, numericality: { greater_than: 0 } 
    validates :date, presence: true

    def bookTicketWithoutCompanion(user)
        if Ticket.find_by(user_id: user.id, tour_id: self.id).present?
            return {
                "status" => "already_booked",
                "ticket_created" => false
            }
        elsif self.passenger_limit == 0
            return {
                "status" => "completely_booked",
                "ticket_created" => false
            }
        else
            new_ticket = Ticket.new
            new_ticket.user_id = user.id
            new_ticket.tour_id = self.id

            new_ticket.save
            self.passenger_limit = self.passenger_limit - 1
            self.save
            return {
                "status" => "created",
                "ticket_created" => true
            }
        end
    end

    def bookTicketWithCompanion(user)

        if Ticket.exists?(user_id: user.id, tour_id: self.id)
            return {
                "status" => "already_booked",
                "ticket_created" => false
            }
        elsif self.passenger_limit == 0
            return {
                "status" => "completely_booked",
                "ticket_created" => false
            }
        else
            new_ticket = Ticket.new
            new_ticket.user_id = user.id
            new_ticket.tour_id = self.id

            if Companion.find_by(tour_id: self.id, gender: user.gender).present?
                companion_to_remove = Companion.find_by(tour_id: self.id, gender: user.gender)
                
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
                companion_to_add.tour_id = self.id
                companion_to_add.user_id = user.id
                companion_to_add.ticket_id = new_ticket.id
                companion_to_add.save
            end
            self.passenger_limit = self.passenger_limit - 1
            self.save
            return {
                "status" => "created",
                "ticket_created" => true
            }
        end
    end
end
