import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Home from "./Home";
import bgVideo from "./space.mp4";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <header className="App-header">
          <Home />
        </header>
        <video autoPlay muted loop>
          <source src={bgVideo} type="video/mp4" />
        </video>
      </ChakraProvider>
    </div>
  );
}

export default App;
