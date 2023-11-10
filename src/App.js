import "./App.css";
import VideoPlayer from "./components/Player/Player";

function App() {
  return (
    <div className="App">
      <h3 style={{ textAlign: "center", color: "purple" }}>Vidyo Player</h3>
      <div>
        <VideoPlayer />
      </div>
    </div>
  );
}

export default App;
