require 'rails_helper'

RSpec.describe User, type: :model do
    subject{ User.new(user_name: "rspec1",\
         gender: 0, password: "rspec",\
         password_confirmation: "rspec",\
         is_admin: false) }

    before { subject.save }
    
    it 'checking user name' do
        expect(subject.user_name).to eq("rspec1")
    end

    it 'valid with valid data' do
        expect(subject).to be_valid
    end

    it "is not valid without a user_name" do
        temp_user = User.new(user_name: nil)
        expect(temp_user).to_not be_valid
    end

    it "is not valid without a gender" do
        temp_user = User.new(gender: nil)
        expect(temp_user).to_not be_valid
    end

    it "should have many tickets" do
        t = User.reflect_on_association(:tickets)
        expect(t.macro).to eq(:has_many)
    end
    
end