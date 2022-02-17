require 'rails_helper'

RSpec.describe ToursController, type: :controller do

    describe "#create" do
        it 'It successfully adds a tour' do
            post(:create, params: { "tour_code"=>"080", "from"=>"Indore", "to"=>"Bhopal", "start_time"=>"18:00", "end_time"=>"10:00", "passenger_limit"=>"11", "price"=>"1111", "date"=>"2022-02-13"})
            expect(response.status).to eq(200)
        end
  
        it 'It would not create any tour as missing parameter' do
            post(:create, params: { "tour_code"=>"", "from"=>"Indore", "to"=>"Bhopal", "start_time"=>"18:00", "end_time"=>"10:00", "passenger_limit"=>"-11", "price"=>"1111", "date"=>"2022-02-13"})
            expect(response.status).to eq(422)
        end

    end

    describe "#showAllTour" do
        it "It returns all the tours" do 
            get :showAllTour
            expect(response.status).to eq(200)
        end
    end

    describe "#showTour" do 
        it "It returns a specific chosen tour" do 
            get(:showTour, params: {:tour_id => 1})
            expect(response).to have_http_status(200)
        end
    end

    # describe "#bookTicketWithoutCompanion" do 
    #     it "Successful ticket booking without companion" do
    #         allow_any_instance_of(ToursController).to receive(:checkUser).and_return(:true)
    #         get(:bookTicketWithoutCompanion, params: {:param => 1}, session: {:user_id => 1})
    #         expect(flash[:success]).to be_present
    #     end

    #     it "All ticket for the tour has already booked." do
    #         allow_any_instance_of(ToursController).to receive(:checkUser).and_return(:true)
    #         get(:bookTicketWithoutCompanion, params: {:param => 2}, session: {:user_id => 1})
    #         expect(flash[:error]).to be_present
    #     end
    # end

    # describe "#bookTicketWithCompanion" do 
    #     it "Successful ticket booking with user being the first companion" do
    #         allow_any_instance_of(ToursController).to receive(:checkUser).and_return(:true)
    #         get(:bookTicketWithCompanion, params: {:param => "4"}, session: {:user_id => 1})
    #         expect(flash[:success]).to be_present
    #     end

    #     it "Successful ticket booking with user being the second companion" do
    #         allow_any_instance_of(ToursController).to receive(:checkUser).and_return(:true)
    #         get(:bookTicketWithCompanion, params: {:param => "1"}, session: {:user_id => 2})
    #         expect(flash[:success]).to be_present
    #     end

    #     it "All ticket for the tour has already booked." do
    #         allow_any_instance_of(ToursController).to receive(:checkUser).and_return(:true)
    #         get(:bookTicketWithCompanion, params: {:param => "2"}, session: {:user_id => 1})
    #         expect(flash[:error]).to be_present
    #     end
    # end
end