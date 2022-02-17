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

    describe "#bookTicketWithoutCompanion" do 
        it "It should not book ticket for invalid tour" do
            post(:bookTicketWithoutCompanion, params: {:param => -11, :user_name => "neer"})
            expect(response).to have_http_status(404)
        end

        it "It should not create another ticket for the same user and tour (no double ticket)." do
            post(:bookTicketWithoutCompanion, params: {:param => 1, :user_name => "neer"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "already_booked",
                ticket_created: false
            })
            expect(response).to have_http_status(200)
        end

        it "All ticket for the tour has completely booked." do
            post(:bookTicketWithoutCompanion, params: {:param => 2, :user_name => "neeraj"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "completely_booked",
                ticket_created: false
            })
            expect(response).to have_http_status(200)
        end

        it "It should successfully book the ticket without companion" do
            post(:bookTicketWithoutCompanion, params: {:param => 3, :user_name => "neeraj"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "created",
                ticket_created: true
            })
            expect(response).to have_http_status(200)
        end

    end

    describe "#bookTicketWithCompanion" do 

        it "It should not book ticket for invalid tour" do
            post(:bookTicketWithCompanion, params: {:param => -11, :user_name => "neer"})
            expect(response).to have_http_status(404)
        end

        it "It should not create another ticket for the same user and tour (no double ticket)." do
            post(:bookTicketWithCompanion, params: {:param => 1, :user_name => "neer"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "already_booked",
                ticket_created: false
            })
            expect(response).to have_http_status(200)
        end

        it "All ticket for the tour has completely booked." do
            post(:bookTicketWithCompanion, params: {:param => "2", :user_name => "neeraj"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "completely_booked",
                ticket_created: false
            })
            expect(response).to have_http_status(200)
        end

        it "Successful ticket booking with user being the first companion" do
            post(:bookTicketWithCompanion, params: {:param => "4", :user_name => "admin"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "created",
                ticket_created: true
            })
            expect(response).to have_http_status(200)
        end

        it "Successful ticket booking with user being the second companion" do
            post(:bookTicketWithCompanion, params: {:param => "1", :user_name => "neeraj"})
            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json).to eq({
                status: "created",
                ticket_created: true
            })
            expect(response).to have_http_status(200)
        end
    end
end