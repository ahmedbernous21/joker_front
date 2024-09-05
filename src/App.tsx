import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Design from "./pages/design/Design";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/LoginAdmin/LoginAdmin";
import Home from "./pages/home/Home";
import { useEffect } from "react";
// import "./registerServiceWorker";
import Dashboard from "./pages/Dashboard/dashboard";
import Articles from "./pages/Articles/Articles";

function App() {
  // useEffect(() => {
  //   const subscribeUser = async () => {
  //     if ("serviceWorker" in navigator && "PushManager" in window) {
  //       const registration = await navigator.serviceWorker.ready;
  //       const subscription = await registration.pushManager.subscribe({
  //         userVisibleOnly: true,
  //         applicationServerKey: urlBase64ToUint8Array(
  //           "BKbD5uvGs3BdjwzRvEn9xZitvq-CMoV1aCBrCQBffJbCm9tVZ0715ehkPdwmsy6zBlp2BenW6R8VPc5o_EIrk7k",
  //         ),
  //       });

  //       // Send subscription to your server

  //       await fetch("https://final-test-not.onrender.com/subscribe", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(subscription),
  //       });
  //     }
  //   };

  //   subscribeUser().catch(console.error);
  // }, []);

  // function urlBase64ToUint8Array(base64String: string): Uint8Array {
  //   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, "+")
  //     .replace(/_/g, "/");
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }

  //   return outputArray;
  // }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Design />} path="/design/:article" />
        <Route element={<Articles />} path="/design/" />
        <Route element={<Login />} path="/kedache/" />
        <Route element={<Dashboard />} path="/dashboard/overview/" />
        <Route element={<Admin />} path="/dashboard/articles/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
