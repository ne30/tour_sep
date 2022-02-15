class Companion < ApplicationRecord
    enum gender: [ :m, :f ]
    belongs_to :user
    belongs_to :tour
    validates :gender, presence: true
end
