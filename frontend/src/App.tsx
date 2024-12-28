
import { Routes , Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useTheme from "./stores/useTheme";
import Home from "./pages/Home";
import { Footer } from "./components/Footer";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";


function App() {
  const {isDarkMode} = useTheme()
  return (
    <div data-theme={isDarkMode?"black":"light"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Authentication />}/>
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
