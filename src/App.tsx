import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Canvas from "./pages/canvas/Canvas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Home />} path="/" /> */}
        {/* <Route element={<Login />} path="/login" /> */}
        <Route element={<Canvas />} path="/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
