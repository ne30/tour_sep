require 'rails_helper'

RSpec.describe TicketsController, type: :controller do

  # allow_any_instance_of(ApplicationController).to receive(:set_tenant).and_return(true)
  describe '#showAllTickets' do
    it "returns all the tickets" do
      get :showAllTickets 
      expect(response.status).to eq(200)
    end
  end

  describe '#showUserTickets' do
    # before { TicketsController.instance_variable_set(:@user, User.all[0]) }
    # let
    it "When there is no such user" do
      get(:showUserTickets, params: {:user_name => "no_such_user"})
      expect(response.status).to eq(401)
    end

    it "User will get all of his/her own booked tickets" do
      get(:showUserTickets, params: {:user_name => "neer"})
      expect(response.status).to eq(200)
    end
  end

  describe "#cancelTicket" do
    it "It does not cancle when invalid ticket is passed" do
      post(:cancelTicket, params: {:param => 115})
      expect(response.status).to eq(404)
    end

    it "cancels ticket when there is no Companion for the user" do
      post(:cancelTicket, params: {:param => 5})
      expect(response.status).to eq(200)
    end

    it "cancels ticket when there is a companion for the user and also a companion for new pairing" do
      post(:cancelTicket, params: {:param => 1})
      expect(response.status).to eq(200)
    end

    it "cancels ticket when there is a companion for the user and no companion for a new pairing" do
      post(:cancelTicket, params: {:param => 3})
      expect(response.status).to eq(200)
    end
  end
end
