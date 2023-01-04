import { NodeProps } from "../components/Node"

export const data: NodeProps = {
  id: "1",
  name: "root",
  children: [
    {
      id: "1-1",
      name: "Maryam",
    },
    {
      id: "1-2",
      name: "Morteza",
    },
    {
      id: "1-3",
      name: "Mohsen",
      children: [
        {
          id: "1-3-1",
          name: "Deniz",
          children: [
            { id: "1-3-1-1", name: "Taraneh" },
            { id: "1-3-1-2", name: "Soheil" },
          ],
        },
      ],
    },
  ],
}
