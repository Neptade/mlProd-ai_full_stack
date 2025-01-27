import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import {PredictionResult} from "./PredictionResult";

test("renders prediction result correctly", () => {
  const prediction = "Iris-setosa";

  render(<PredictionResult prediction={prediction} />);

  expect(screen.getByText(/The flower is:/i)).toBeInTheDocument();
  expect(screen.getByText(/Iris-setosa/i)).toBeInTheDocument();
});
