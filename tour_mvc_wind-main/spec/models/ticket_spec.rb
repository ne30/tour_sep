require 'rails_helper'

RSpec.describe Ticket, type: :model do
  it "Associations user" do
    should belong_to(:user).without_validating_presence
  end

  it "Associations tour" do
    should belong_to(:tour).without_validating_presence
  end
end
