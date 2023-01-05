import { Node } from "./components/Node"
import { data } from "./mock/mockData"
import "./css/App.css"

const App = () => {
  return (
    <div className="container">
      <h1>Folder Management</h1>
      <Node {...data} />
    </div>
  )
}

export default App
