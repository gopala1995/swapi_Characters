import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import bgVideo from "./space.mp4";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Home />
      </header> */}
      <video autoPlay muted loop>
        <source src={bgVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
