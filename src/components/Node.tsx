import { ChangeEvent, FC, useRef, useState } from "react"
import "../css/Node.css"
import { joinCssClasses } from "../utils/csss"
import { getChildrenHeight } from "../utils/height"

export type NodeProps = {
  id: string
  name: string
  children?: NodeProps[]
}

export const Node: FC<NodeProps> = ({ id, name, children }) => {
  let newChildId = 1

  const newChildInputRef = useRef<HTMLInputElement>(null)

  const [isChildrenExpanded, setIsChildrenExpanded] = useState(false)
  const [isNewChildInputShown, setIsNewChildInputShown] = useState(false)
  const [newChildValue, setNewChildValue] = useState("")
  const [newChildren, setNewChildren] = useState(children)

  const onNodeDelete = () => {}

  const onNodeEdit = () => {}

  const onToggle = () => {
    setIsChildrenExpanded((isExpanded) => !isExpanded)
  }

  const onNewChildInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewChildValue(e.target.value)
  }

  const onShowNewChild = () => {
    setIsNewChildInputShown(true)
    newChildInputRef?.current?.focus()
  }

  const onAddNode = () => {
    const newAddedChildren = [
      ...(newChildren || []),
      { id: id + "-" + newChildId++, name: newChildValue },
    ]
    setNewChildren(newAddedChildren)
    setIsNewChildInputShown(false)
    setIsChildrenExpanded(true)
    setNewChildValue("")
  }

  const onCancelAddNode = () => {
    setIsNewChildInputShown(false)
    setNewChildValue("")
  }

  return (
    <div id={id} className="node-container">
      <div className="node-name-wrapper">
        <div className="node-indicator"></div>
        <div className="node-name">{name}</div>
        {newChildren && (
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
        <div className="add-child" title="Add" onClick={onShowNewChild}>
          <div className="add">+</div>
        </div>
        <div className="delete-child" title="Delete">
          <div className="delete" onClick={onNodeDelete}>
            -
          </div>
        </div>
        <div className="edit-child" title="Edit" onClick={onNodeEdit}>
          ~
        </div>
      </div>
      <div
        className={joinCssClasses(
          "new-child-wrapper",
          isNewChildInputShown && "new-child-wrapper-shown"
        )}
      >
        <input
          ref={newChildInputRef}
          className="new-child-input"
          onChange={onNewChildInputChange}
          value={newChildValue}
        />
        <div className="submit-add-child" title="Add" onClick={onAddNode}>
          <div className="submit-add">+</div>
        </div>

        <div className="cancel-add-child" title="Cancel">
          <div className="cancel" onClick={onCancelAddNode}>
            x
          </div>
        </div>
      </div>
      {newChildren && (
        <div
          className={joinCssClasses(
            "children",
            isChildrenExpanded && "children-shown"
          )}
        >
          {newChildren.map?.((nodeChild) => (
            <Node {...nodeChild} />
          ))}
        </div>
      )}
    </div>
  )
}
