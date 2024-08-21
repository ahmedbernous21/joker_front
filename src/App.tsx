import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Design from "./pages/design/Design";
// import Login from "./pages/login/Login";
// import Canvas from "./components/tshirtCanvas/TshirtCanvas";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";
// import Home from "./pages/home/home";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/LoginAdmin/LoginAdmin";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Design />} path="/design/:article" />
        <Route element={<Login />} path="/kedache/" />
        <Route element={<Admin />} path="/dashboard/" />
        <Route element={<NotFound />} path="* " />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
