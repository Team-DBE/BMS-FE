import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/globalStyles";
import Home from "./pages/home/home";

function App() {
  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
