import { NodeProps } from "../components/Node"

export const getChildrenHeight = (data: NodeProps): number => {
  return data.children
    ? data.children.length +
        data.children.reduce(
          (sum, nodeChild) => sum + getChildrenHeight(nodeChild),
          0
        )
    : 0
}
