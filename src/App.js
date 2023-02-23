import PostList from "./pages/post-list";
import "./App.css";
import PostDetails from "./pages/post-details";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
