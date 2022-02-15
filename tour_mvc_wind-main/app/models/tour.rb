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
end
