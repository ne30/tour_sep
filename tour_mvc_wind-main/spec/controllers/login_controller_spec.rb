require 'rails_helper'

RSpec.describe LoginController, type: :controller do
  describe "#create" do
    it 'User successfully logged in' do
      post(:create, params: { :user_name => "neer" , :password => "neer"})
      expect(response.status).to eq(200)
    end

    it 'User not logged in' do
      post(:create, params: { :user_name => "-" , :password => "-"})
      expect(response.status).to eq(401)
    end
  end

  describe "#is_admin" do
    it 'User is not admin' do 
      get(:is_admin, params: {'user_name' => 'neer'})
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json).to eq({
        is_admin: false
      })
    end

    it 'User is admin' do
      get(:is_admin, params: {'user_name' => 'admin'})
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json).to eq({
        is_admin: true
      })
    end
  end

  describe "logged_in" do
    it 'User is not logged in' do
      get(:logged_in)
      expect(response.status).to eq(401)
    end

    it 'User is logged in' do
      get(:logged_in, session: {'user_id' => 1})
      expect(response.status).to eq(200)
    end
  end

  describe "#logout" do
    it 'User is successfully logged out.' do 
      post :logout
      expect(response.status).to eq(200)
    end
  end
end
