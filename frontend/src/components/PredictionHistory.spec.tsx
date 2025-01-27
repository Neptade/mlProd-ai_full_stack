import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import {PredictionHistory} from "./PredictionHistory";

test("renders prediction history correctly", () => {
  const history = [
    {
      id: "1",
      data: { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2 },
      result: "Iris-setosa",
    },
    {
      id: "2",
      data: { sepalLength: 6.2, sepalWidth: 2.9, petalLength: 4.3, petalWidth: 1.3 },
      result: "Iris-versicolor",
    },
  ];

  render(<PredictionHistory history={history} />);

  // Check if history entries are rendered
  expect(screen.getByText(/Result: Iris-setosa/i)).toBeInTheDocument();
  expect(screen.getByText(/Result: Iris-versicolor/i)).toBeInTheDocument();

  // Check if input data is rendered correctly
  expect(screen.getByText(/ID: 1/i)).toBeInTheDocument();
  expect(screen.getByText(/ID: 2/i)).toBeInTheDocument();
});
