// App.jsx
// Defines app routes

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/editor" element={<h1>Resume Editor</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
