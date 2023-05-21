import React from "react";
import { render, screen } from "@testing-library/react";
import Booking from "../src/components/Booking/Booking";

jest.mock("../src/api-helpers/api-helpers", () => ({
  getMovieDetails: jest.fn().mockResolvedValue({
    movie: {
      id: 1,
      title: "Test Movie",
      description: "This is a test movie",
      actors: ["Actor 1", "Actor 2"],
      releaseDate: "2023-01-01",
      posterUrl: "test-poster.jpg",
      trailerUrl: "https://www.youtube.com/embed/test-trailer",
    },
  }),
  newBooking: jest.fn().mockResolvedValue({ success: true }),
}));

describe("Booking", () => {
  it("renders the booking form with movie details", async () => {
    render(<Booking />);

    // Wait for the movie details to be loaded
    await screen.findByText("Book Tickets for Movie: Test Movie");

    // Check if the movie details are rendered correctly
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("This is a test movie")).toBeInTheDocument();
    expect(screen.getByText("Actor 1, Actor 2")).toBeInTheDocument();
    expect(screen.getByText("Release Date: Wed Jan 01 2023")).toBeInTheDocument();

    // Check if the booking form elements are rendered
    expect(screen.getByLabelText("Seat Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Booking Date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Book" })).toBeInTheDocument();
  });

  it("submits the booking form", async () => {
    render(<Booking />);

    // Wait for the movie details to be loaded
    await screen.findByText("Book Tickets for Movie: Test Movie");

    // Enter form values
    const seatNumberInput = screen.getByLabelText("Seat Number");
    const dateInput = screen.getByLabelText("Booking Date");
    const bookButton = screen.getByRole("button", { name: "Book" });

    // Simulate user input
    fireEvent.change(seatNumberInput, { target: { value: "5" } });
    fireEvent.change(dateInput, { target: { value: "2023-05-22" } });

    // Submit the form
    fireEvent.click(bookButton);

    // Wait for the booking request to complete
    await waitFor(() => expect(newBooking).toHaveBeenCalledTimes(1));

    // Check if the booking was successful
    expect(newBooking).toHaveBeenCalledWith({
      seatNumber: "5",
      date: "2023-05-22",
      movie: 1,
    });
    // Add additional assertions based on the expected behavior
  });
});
