require 'rails_helper'

RSpec.describe AdminController, type: :controller do
  
  describe "#new" do
    it 'render to admin signIn' do 
      get :new
      expect(response).to have_http_status(200)
    end
  end

  describe "#create" do
    it 'success_login' do
      post(:create, params: { :user_name => "admin" , :password => "admin"})
      expect(response).to redirect_to(tours_path)
    end

    it 'Invalid data login attempt' do
      post(:create, params: { :user_name => "admin" , :password => "admin21"})
      expect(response).to redirect_to(admin_path)
    end

  end

  describe "#logout" do
    it 'render to admin signIn' do 
      post :logout
      expect(response).to have_http_status(302)
    end
  end
end
