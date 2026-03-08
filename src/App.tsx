import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { WhyDsaMatterLesson } from "./lessons/why-dsa-matter";
import { WhyAlgorithmsMatterLesson } from "./lessons/why-algorithms-matter";
import { BigONotationLesson } from "./lessons/big-o-notation";
import { SpeedingUpBigOLesson } from "./lessons/speeding-up-big-o";
import { OptimizingCodeLesson } from "./lessons/optimizing-code";
import { OptimisticScenariosLesson } from "./lessons/optimistic-scenarios";
import { BigOEverydayLesson } from "./lessons/big-o-everyday";
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
        <Route path="/lessons/big-o-notation" element={<BigONotationLesson />} />
        <Route path="/lessons/speeding-up-big-o" element={<SpeedingUpBigOLesson />} />
        <Route path="/lessons/optimizing-code" element={<OptimizingCodeLesson />} />
        <Route path="/lessons/optimistic-scenarios" element={<OptimisticScenariosLesson />} />
        <Route path="/lessons/big-o-everyday" element={<BigOEverydayLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
