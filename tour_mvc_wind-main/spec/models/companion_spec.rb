require 'rails_helper'

RSpec.describe Companion, type: :model do
  it "is not valid without a gender" do
    temp_companion = Companion.new(gender: nil)
    expect(temp_companion).to_not be_valid
  end
end
