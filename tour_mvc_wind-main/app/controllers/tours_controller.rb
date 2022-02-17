class ToursController <  ApplicationController
    def create
        new_tour = Tour.new(tourParams)
        if new_tour.valid?
            new_tour.save
            render json: {
                status: :added_tour,
                tour_added: true
            }, status: 200
        else
            render json: { 
                status: :something_went_wrong,
                tour_added: false
            }, status: 422
        end
    end

    def showAllTour
        tours = Tour.all
        render json: TourSerializer.new(tours).serialized_json, status: 200
    end

    def showTour
        chosen_tour = Tour.find(params[:tour_id])
        render json: TourSerializer.new(chosen_tour).serialized_json, status: 200
    end

    def bookTicketWithoutCompanion
        if Tour.exists?(params[:param])
            tour_to_book = Tour.find(params[:param])
            user = User.find_by(user_name: params[:user_name])

            obtained_json = tour_to_book.bookTicketWithoutCompanion(user)
            render json: obtained_json, status: 200
        else
            render json:{
                status: :invalid_tour,
                ticket_created: false
            }, status: 404
        end
    end

    def bookTicketWithCompanion
        if Tour.exists?(params[:param])
            tour_to_book = Tour.find(params[:param])
            user = User.find_by(user_name: params[:user_name])

            obtained_json = tour_to_book.bookTicketWithCompanion(user)
            render json: obtained_json, status: 200
        else
            render json:{
                status: :invalid_tour,
                ticket_created: false
            }, status: 404
        end
    end

    private 
    def tourParams
        params.permit(:tour_code, :from, :to, :start_time, :end_time, :passenger_limit, :price, :date)
    end
end