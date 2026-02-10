import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { WhyDsaMatterLesson } from "./lessons/why-dsa-matter";
import { WhatAreDataStructuresArticle } from "./articles/what-are-data-structures";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route
          path="/articles/what-are-data-structures"
          element={<WhatAreDataStructuresArticle />}
        />
        <Route path="/lessons/why-dsa-matter" element={<WhyDsaMatterLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
