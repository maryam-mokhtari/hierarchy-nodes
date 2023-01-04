import { FC, useState } from "react"
import "../css/Node.css"
import { getChildrenHeight } from "../utils/height"

export type NodeProps = {
  id: string
  name: string
  children?: NodeProps[]
}

const NODE_HEIGHT = 30

export const Node: FC<NodeProps> = ({ id, name, children }) => {
  const [isChildrenExpanded, setIsChildrenExpanded] = useState(false)

  const onToggle = () => {
    setIsChildrenExpanded((isExpanded) => !isExpanded)
  }

  const childrenHeight = getChildrenHeight({ id, name, children })

  return (
    <div id={id} className="node-container">
      <div className="node-name-wrapper" style={{ height: NODE_HEIGHT }}>
        <div className="node-indicator"></div>
        <div className="node-name">{name}</div>
        {children && (
          <div
            className="expand-children"
            onClick={onToggle}
            style={{
              transform: isChildrenExpanded
                ? "scale(1.5, 0.75) rotate(90deg)"
                : "scale(0.75, 1.5) rotate(0deg)",
            }}
          >
            &gt;
          </div>
        )}
        <div className="add-children" title="Add">
          <div className="add">+</div>
        </div>
        <div className="delete-children" title="Delete">
          <div className="delete">x</div>
        </div>
        <div className="edit-children" title="Edit">
          ~
        </div>
      </div>
      {children && (
        <div
          className="children"
          style={{
            maxHeight: isChildrenExpanded ? childrenHeight * NODE_HEIGHT : 0,
            transitionDuration: `${0.2 + childrenHeight * 0.01}s`,
          }}
        >
          {children.map?.((nodeChild) => (
            <Node {...nodeChild} />
          ))}
        </div>
      )}
    </div>
  )
}
