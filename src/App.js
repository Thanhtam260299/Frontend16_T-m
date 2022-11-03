import "./App.scss";

import { BrowserRouter } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ConfigRoutes from "./config/ConfigRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ConfigRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
