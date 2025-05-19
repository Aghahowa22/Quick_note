
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
