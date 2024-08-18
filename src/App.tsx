import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Canvas from "./components/tshirtCanvas/TshirtCanvas";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<NotFound />} path="* " />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
