class TourSerializer
    include FastJsonapi::ObjectSerializer
    attributes :tour_code, :from, :to, :start_time, :end_time, :passenger_limit, :price, :date
    
    has_many :companions
  end
  