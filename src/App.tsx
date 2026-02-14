import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { WhyDsaMatterLesson } from "./lessons/why-dsa-matter";
import { WhyAlgorithmsMatterLesson } from "./lessons/why-algorithms-matter";
import { WhatAreDataStructuresArticle } from "./articles/what-are-data-structures";
import { WhatIsAnAlgorithmArticle } from "./articles/what-is-an-algorithm";

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
        <Route
          path="/articles/what-is-an-algorithm"
          element={<WhatIsAnAlgorithmArticle />}
        />
        <Route path="/lessons/why-dsa-matter" element={<WhyDsaMatterLesson />} />
        <Route path="/lessons/why-algorithms-matter" element={<WhyAlgorithmsMatterLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
