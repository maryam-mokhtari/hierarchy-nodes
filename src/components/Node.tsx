import { ChangeEvent, FC, useRef, useState } from "react"
import "../css/Node.css"
import { joinCssClasses } from "../utils/css"

export type NodeProps = {
  id: string
  name: string
  children?: NodeProps[]
}

const ROOT_NODE_NAME = "root"

export const Node: FC<NodeProps> = ({ id, name, children }) => {
  let newChildId = 1

  const newChildInputRef = useRef<HTMLInputElement>(null)

  const [isChildrenExpanded, setIsChildrenExpanded] = useState(false)
  const [isNewChildInputShown, setIsNewChildInputShown] = useState(false)
  const [newChildValue, setNewChildValue] = useState("")
  const [newChildren, setNewChildren] = useState(children)
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [isNodeDeleted, setIsNodeDeleted] = useState(false)

  const isRootNode = name === ROOT_NODE_NAME

  const onNodeDelete = () => {
    setIsNodeDeleted(true)
  }

  const onNodeEdit = () => {
    if (!isRootNode) {
      setIsNameEditing(true)
    }
  }

  const onNodeUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNameEditing && e?.target?.value) {
      setIsNameEditing(false)
    }
  }

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
    if (newChildValue) {
      const newAddedChildren = [
        ...(newChildren || []),
        { id: id + "-" + newChildId++, name: newChildValue },
      ]
      setNewChildren(newAddedChildren)
      setIsNewChildInputShown(false)
      setIsChildrenExpanded(true)
      setNewChildValue("")
    }
  }

  const onCancelAddNode = () => {
    setIsNewChildInputShown(false)
    setNewChildValue("")
  }

  return isNodeDeleted ? (
    <></>
  ) : (
    <div id={id} data-testId={id} className="node-container">
      <div className="node-name-wrapper">
        <div className="left">
          {newChildren && (
            <div
              className={
                isChildrenExpanded ? "collapse-children" : "expand-children"
              }
              onClick={onToggle}
            >
              &gt;
            </div>
          )}
          <div className="node-indicator"></div>
          <input
            aria-label="input-node"
            data-testId={`node-${id}`}
            className={joinCssClasses(
              "node-name",
              isNameEditing && "node-name-editing"
            )}
            defaultValue={name}
            onClick={onNodeEdit}
            onBlur={onNodeUpdate}
            readOnly={!isNameEditing}
          />
        </div>
        <div className="right">
          <div
            className="add-child"
            title="Add"
            data-testId={`add-to-${id}`}
            onClick={onShowNewChild}
          >
            <div className="add">+</div>
          </div>
          {!isRootNode && (
            <div
              className="delete-child"
              title="Delete"
              data-testId={`delete-${id}`}
              onClick={onNodeDelete}
            >
              <div className="delete">-</div>
            </div>
          )}
        </div>
      </div>
      <div
        className={joinCssClasses(
          "new-child-wrapper",
          isNewChildInputShown && "new-child-wrapper-shown"
        )}
      >
        <input
          data-testId={`child-of-${id}`}
          ref={newChildInputRef}
          className="new-child-input"
          onChange={onNewChildInputChange}
          value={newChildValue}
        />
        <div
          className="submit-add-child"
          title="Add"
          data-testId={`submit-add-to-${id}`}
          onClick={onAddNode}
        >
          <div className="submit-add">+</div>
        </div>

        <div
          className="cancel-add-child"
          data-testId={`cancel-add-to-${id}`}
          onClick={onCancelAddNode}
          title="Cancel"
        >
          <div className="cancel">x</div>
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
            <Node key={id} {...nodeChild} />
          ))}
        </div>
      )}
    </div>
  )
}
