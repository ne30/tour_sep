Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "registrations#new"
  resources :login, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "login#logout"
  get :logged_in, to: "login#logged_in"
  # get "home", to: "homepage#index"
  
  get "sign_up", to: "registrations#new"
  post "sign_up", to: "registrations#create"

  # get "sign_in", to: "login#new"
  # post "sign_in", to: "login#create"
  post "logout", to: "login#logout"

  get "add_tour", to: "tours#new"
  get "tours", to: "tours#showAllTour"
  get "chosen_tour", to: "tours#showTour"
  post "add_tour", to: "tours#create"
  post "tours_with_companion", to: "tours#bookTicketWithCompanion"
  post "tours_without_companion", to: "tours#bookTicketWithoutCompanion"
  
  
  get "tickets", to: "tickets#showUserTickets"
  get "all_tickets", to: "tickets#showAllTickets"
  post "cancel", to: "tickets#cancelTicket"

  get "admin", to: "admin#new"
  post "admin", to: "admin#create"
  post "logout_admin", to: "admin#logout"

end
