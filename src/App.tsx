import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WhyDsaMatterLesson } from "./lessons/why-dsa-matter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons/why-dsa-matter" element={<WhyDsaMatterLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
