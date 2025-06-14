import { render, screen, fireEvent } from "@testing-library/react";
import OtherCities from "./OtherCities";

describe("OtherCities", () => {
  const mockSetSelectedCoordinates = jest.fn();

  const mockData = [
    {
      name: "Sydney",
      tempRange: { min: 10, max: 20 },
      condition: "Cloudy",
      lat: -33.8688,
      lon: 151.2093,
    },
    {
      name: "Shanghai",
      tempRange: { min: 15, max: 25 },
      condition: "Sunny",
      lat: 31.2304,
      lon: 121.4737,
    },
  ];

  it("should call setSelectedCoordinates when a city is clicked", () => {
    render(
      <OtherCities
        data={mockData}
        setSelectedCoordinates={mockSetSelectedCoordinates}
      />
    );

    const cityCard = screen.getByText(/sydney/i);

    fireEvent.click(cityCard);

    expect(mockSetSelectedCoordinates).toHaveBeenCalledWith(mockData[0]);
    expect(mockSetSelectedCoordinates).toHaveBeenCalledTimes(1);
  });
});
