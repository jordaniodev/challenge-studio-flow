import { ToastContainer } from "react-toastify"
import { ProductionProvider } from "./contexts/production/production.context"
import Routes from "./routes"
import "./styles/global.css"
import { SceneProvider } from "./contexts/scenes/scenes.context"

function App() {
  return (
    <ProductionProvider>
      <SceneProvider>
        <Routes />
        <ToastContainer />
      </SceneProvider>
    </ProductionProvider>
  )
}

export default App
