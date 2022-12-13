import { BrowserRouter } from "react-router-dom";
import Routers from "./routers/Routers";
import "antd/dist/antd.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
