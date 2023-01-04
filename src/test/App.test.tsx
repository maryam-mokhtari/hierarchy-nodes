import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../App"

test("renders root node", () => {
  render(<App />)
  const root = screen.getByText(/root/i)
  expect(root).toBeInTheDocument()
})
