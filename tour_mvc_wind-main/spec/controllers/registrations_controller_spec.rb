require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  describe "#new" do
    it 'render to signUp' do 
      get :new
      expect(response).to have_http_status(200)
    end
  end

  describe "#create" do
    it 'successful signUp' do
      post(:create, params: { :user => { :user_name => "test_user" , :gender => 'f', :password => "test", :password_confirmation => "test"}})
      expect(response).to redirect_to(sign_in_path)
      expect(flash[:success]).to be_present
    end

    it 'Un-successful signUp' do
      post(:create, params: { :user => { :user_name => "-" , :password => "-"}})
      expect(response).to redirect_to(sign_up_path)
      expect(flash[:error]).to be_present
    end

  end

end
