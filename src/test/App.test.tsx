import { fireEvent, render, screen } from "@testing-library/react"
import App from "../App"

test("renders page title", () => {
  render(<App />)
  const title = screen.getByRole("heading", { level: 1 })
  expect(title).toBeInTheDocument()
})

test("renders root node", () => {
  render(<App />)
  const root = screen.getByDisplayValue(/root/i)
  expect(root).toBeInTheDocument()
})

test("renders at least one root node with one child node", () => {
  render(<App />)
  const inputNodes = screen.getAllByRole("textbox", { name: "input-node" })
  expect(inputNodes.length).toBeGreaterThan(1)
})

test("checks readonly of input node", () => {
  render(<App />)
  const inputNode = screen.getByTestId("node-1-1")
  expect(inputNode).toHaveAttribute("readonly")
})

test("checks editable mode of input node", () => {
  render(<App />)
  const inputNode = screen.getByTestId("node-1-1")
  fireEvent.click(inputNode)
  expect(inputNode).not.toHaveAttribute("readonly")
  fireEvent.focusOut(inputNode)
  expect(inputNode).toHaveAttribute("readonly")
})

test("handles root node not to be editable", () => {
  render(<App />)
  const rootNode = screen.getAllByRole("textbox", { name: "input-node" })[0]
  expect(rootNode).toHaveAttribute("readonly")
  fireEvent.click(rootNode)
  expect(rootNode).toHaveAttribute("readonly")
})

test("edits input node", () => {
  render(<App />)
  const inputNode = screen.getByTestId("node-1-1")
  fireEvent.click(inputNode)
  fireEvent.change(inputNode, { target: { value: "Node-1-1" } })
  fireEvent.focusOut(inputNode)
  expect(inputNode).toHaveValue("Node-1-1")
})

test("stays in edit mode in case empty value of input node", () => {
  render(<App />)
  const inputNode = screen.getByTestId("node-1-1")
  fireEvent.click(inputNode)
  fireEvent.change(inputNode, { target: { value: "" } })
  expect(inputNode).not.toHaveAttribute("readonly")
  fireEvent.focusOut(inputNode)
  expect(inputNode).not.toHaveAttribute("readonly")
})

test("deletes input node", () => {
  render(<App />)
  const inputNode = screen.getByTestId("node-1-1")
  const deleteButton = screen.getByTestId("delete-1-1")
  expect(inputNode).toBeInTheDocument()
  fireEvent.click(deleteButton)
  expect(inputNode).not.toBeInTheDocument()
})

test("prevents deleting root node", () => {
  render(<App />)
  const rootNode = screen.getByTestId("node-1")
  expect(rootNode).toHaveAttribute("value", expect.stringMatching(/root/i))
  const deleteButton = screen.queryByTestId("delete-1")
  expect(deleteButton).not.toBeInTheDocument()
})

test("focuses input after clicking add", () => {
  render(<App />)
  const inputChildNode = screen.getByTestId("child-of-1-1")
  const addButton = screen.getByTestId("add-to-1-1")
  expect(inputChildNode).not.toHaveFocus()
  fireEvent.click(addButton)
  expect(inputChildNode).toHaveFocus()
})

test("adds new child when submit is clicked", () => {
  render(<App />)
  const node = screen.getByTestId("1-1")
  const inputNode = screen.getByTestId("node-1-1")
  const inputChildNode = screen.getByTestId("child-of-1-1")
  const addButton = screen.getByTestId("add-to-1-1")
  fireEvent.click(addButton)
  fireEvent.change(inputChildNode, { target: { value: "new-child-of-1-1" } })
  const submitAddButton = screen.getByTestId("submit-add-to-1-1")
  const childrenCount = node.querySelectorAll(".node-name").length
  fireEvent.click(submitAddButton)
  const newChildrenCount = node.querySelectorAll(".node-name").length
  expect(newChildrenCount).toEqual(childrenCount + 1)

  const newChildNode =
    node.querySelectorAll(".node-name")[
      node.querySelectorAll(".node-name").length - 1
    ]
  expect(newChildNode).toHaveValue("new-child-of-1-1")
})

test("dismisses adding new child when cancel is clicked", () => {
  render(<App />)
  const node = screen.getByTestId("1-1")
  const inputNode = screen.getByTestId("node-1-1")
  const inputChildNode = screen.getByTestId("child-of-1-1")
  const addButton = screen.getByTestId("add-to-1-1")
  fireEvent.click(addButton)
  fireEvent.change(inputChildNode, { target: { value: "new-child-of-1-1" } })
  const cancelAddButton = screen.getByTestId("cancel-add-to-1-1")
  const childrenCount = node.querySelectorAll(".node-name").length
  fireEvent.click(cancelAddButton)
  const newChildrenCount = node.querySelectorAll(".node-name").length
  expect(newChildrenCount).toEqual(childrenCount)
  const newChild = screen.queryByText("new-child-of-1-1")
  expect(newChild).not.toBeInTheDocument()
})

test("does not allow adding empty value", () => {
  render(<App />)
  const node = screen.getByTestId("1-1")
  const inputNode = screen.getByTestId("node-1-1")
  const inputChildNode = screen.getByTestId("child-of-1-1")
  const addButton = screen.getByTestId("add-to-1-1")
  fireEvent.click(addButton)
  fireEvent.change(inputChildNode, { target: { value: "" } })
  const submitAddButton = screen.getByTestId("submit-add-to-1-1")
  const childrenCount = node.querySelectorAll(".node-name").length
  fireEvent.click(submitAddButton)
  const newChildrenCount = node.querySelectorAll(".node-name").length
  expect(newChildrenCount).toEqual(childrenCount)
  const newChild = screen.queryByText("new-child-of-1-1")
  expect(newChild).not.toBeInTheDocument()
})
