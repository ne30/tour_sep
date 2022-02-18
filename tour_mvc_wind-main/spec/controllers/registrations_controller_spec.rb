require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do

  describe "#create" do
    it 'User Successfully created' do
      subject =  { :user_name => "test_user" , :gender => 'f', :password => "test", :password_confirmation => "test"}
      post(:create, params: { :user => subject})
      expect(response.status).to eq(200)
    end

    it 'No User created password and password confirmation not similar' do
      subject =  { :user_name => "test_user" , :gender => 'f', :password => "", :password_confirmation => "test"}
      post(:create, params: { :user => subject})
      expect(response.status).to eq(500)
    end

  end

end
