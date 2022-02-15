require 'rails_helper'

RSpec.describe Tour, type: :model do

  subject{ Tour.new("tour_code"=>"080", "from"=>"Indore", "to"=>"Bhopal", "start_time"=>"18:00", "end_time"=>"10:00", "passenger_limit"=>"11", "price"=>"1111", "date"=>"2022-02-13")}

  before { subject.save }

  it "should have many tickets" do
    t = Tour.reflect_on_association(:tickets)
    expect(t.macro).to eq(:has_many)
  end

  it 'valid with valid data' do
    expect(subject).to be_valid
  end
end
