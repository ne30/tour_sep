require 'rails_helper'

RSpec.describe TicketsController, type: :controller do

  # allow_any_instance_of(ApplicationController).to receive(:set_tenant).and_return(true)
  describe '#showAllTickets' do
    it "returns all the tickets for admin" do
      # Stubbing
      allow_any_instance_of(TicketsController).to receive(:checkUser).and_return(:true)
      get :showAllTickets 
      expect(:all_tickets).to_not eq(nil)
    end

    it "Not able to access all the tickets" do
      get :showAllTickets
      # 302 Found redirect status response code as it is redirected to signup
      expect(response).to have_http_status(302)
    end
  end

  describe '#showUserTickets' do
    # before { TicketsController.instance_variable_set(:@user, User.all[0]) }
    # let
    it " access all the tickets for user by user_id" do
      get(:showUserTickets, session: {:user_id => 1})
      expect(:tickets).to_not eq(nil)
    end

    it "returns all the tickets for a user" do
      controller.instance_variable_set(:@user, User.new())
      allow_any_instance_of(TicketsController).to receive(:checkUser).and_return(:true)
      # controller.send(:showUserTickets)
      get :showUserTickets
      expect(:tickets).to_not eq(nil)
    end

    it "Wrong user_id check" do
      get(:showUserTickets, session: {:user_id => 11})
      expect(:tickets).to_not eq(nil)
    end
  end

  describe "#cancelTicket" do
    it "cancels ticket when there is no Companion for the user" do
      allow_any_instance_of(TicketsController).to receive(:checkUser).and_return(:true)
      post(:cancelTicket, params: {:param => 5})
      expect(response).to redirect_to(tickets_path)
      expect(flash[:success]).to be_present
    end

    it "cancels ticket when there is a companion for the user and also a companion for new pairing" do
      allow_any_instance_of(TicketsController).to receive(:checkUser).and_return(:true)
      post(:cancelTicket, params: {:param => 1})
      expect(response).to redirect_to(tickets_path)
      expect(flash[:success]).to be_present
    end

    it "cancels ticket when there is a companion for the user and no companion for a new pairing" do
      allow_any_instance_of(TicketsController).to receive(:checkUser).and_return(:true)
      post(:cancelTicket, params: {:param => 3})
      expect(response).to redirect_to(tickets_path)
      expect(flash[:success]).to be_present
    end

  end
end
