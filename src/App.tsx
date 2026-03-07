import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/globalStyles";
import Home from "./pages/home/home";
import Detail from "./pages/detail.tsx";

function App() {
  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route path="/section-1" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
