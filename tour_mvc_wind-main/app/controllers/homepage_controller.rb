class HomepageController <  ApplicationController
    before_action :checkUser

    def checkUser
        if session[:user_id]==nil
            redirect_to sign_up_path, notice: "Logged Out"
        else
            # redirect_to sign_up_path, notice: "Logged Out"
            @user = User.find(session[:user_id])
        end
    end


    def index
        render "home_page"
    end
end

# def add_tour()
#     tour = Tour.new
#     tour.tour_code = gets.chomp
#     tour.from = gets.chomp
#     tour.to = gets.chomp
#     tour.day = gets.chomp
#     tour.start_time = gets.chomp
#     tour.end_time = gets.chomp
#     tour.passenger_limit = gets.chomp.to_i
#     tour.price = gets.chomp.to_f
#     tour.save   
# end

# tours.each do |tour|
#        tour.date = temp_date
#        temp_date = temp_date.plus_with_duration(Random.rand(10))
#        tour.save
#      end