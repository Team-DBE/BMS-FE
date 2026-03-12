import { Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/globalStyles";
import Home from "./pages/home/home";
import Detail from "./pages/detail.tsx";

function App() {
  const lastSessionPath =
    typeof window !== "undefined"
      ? localStorage.getItem("lastSessionPath") || "/section-1"
      : "/section-1";

  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Navigate to={lastSessionPath} replace />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/:sessionId" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
