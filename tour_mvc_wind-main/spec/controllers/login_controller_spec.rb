require 'rails_helper'

RSpec.describe LoginController, type: :controller do
  
  describe "#new" do
    it 'render to signIn' do 
      get :new
      expect(response).to have_http_status(200)
    end
  end

  describe "#create" do
    it 'success_login' do
      post(:create, params: { :user_name => "neer" , :password => "neer"})
      expect(response).to redirect_to(tours_path)
    end

    it 'Invalid data login attempt' do
      post(:create, params: { :user_name => "-" , :password => "-"})
      expect(response).to redirect_to(sign_in_path)
    end

  end

  describe "#logout" do
    it 'render to signUp' do 
      post :logout
      expect(response).to have_http_status(302)
    end
  end
end
