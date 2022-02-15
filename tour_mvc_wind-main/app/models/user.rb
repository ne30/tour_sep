class User < ApplicationRecord
    has_secure_password
    enum gender: [ :m, :f ]
    has_many :tickets
    has_many :companions
    validates :gender, presence: true
    validates :user_name, presence: true, uniqueness:true
end
