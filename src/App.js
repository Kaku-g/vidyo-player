import logo from "./logo.svg";
import "./App.css";
import VideoPlayer from "./components/Player/Player";
import NewPlayer from "./components/NewPlayer";

function App() {
  return (
    <div className="App">
      <div>
        <VideoPlayer />
      </div>

      {/* <NewPlayer /> */}
    </div>
  );
}

export default App;
