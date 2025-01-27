import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import {FlowerDataForm} from "./FlowerDataForm";

test("submitting the form triggers handleSubmit with correct data", async () => {
  const mockHandleSubmit = jest.fn();
  render(<FlowerDataForm onSubmit={mockHandleSubmit} />);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Sepal Length/i), {target:{value:"5.1"}});
  fireEvent.change(screen.getByLabelText(/Sepal Width/i), {target:{value:"3.5"}});
  fireEvent.change(screen.getByLabelText(/Petal Length/i), {target:{value:"1.4"}});
  fireEvent.change(screen.getByLabelText(/Petal Width/i), {target:{value:"0.2"}});

  // Submit the form
  fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

  // Check if handleSubmit was called with correct data
  expect(mockHandleSubmit).toHaveBeenCalledWith({
    sepalLength: 5.1,
    sepalWidth: 3.5,
    petalLength: 1.4,
    petalWidth: 0.2,
  });
});

test("doesn't allow non-number inputs", async () => {
  const mockHandleSubmit = jest.fn();
  render(<FlowerDataForm onSubmit={mockHandleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Sepal Length/i), {target:{value:"abcd"}});

  // Check if handleSubmit was called with correct data
  expect(screen.getByLabelText<HTMLInputElement>(/Sepal Length/i).value).toBe("0");
});
