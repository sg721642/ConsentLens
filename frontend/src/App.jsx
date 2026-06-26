import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="grid-bg" style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;