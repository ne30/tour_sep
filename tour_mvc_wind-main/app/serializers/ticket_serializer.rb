class TicketSerializer
    include FastJsonapi::ObjectSerializer
    attributes :companion_user_name, :id, :user_id, :tour_id, :tour, :user
end