import "./App.css";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Inbox from "./pages/Inbox";
import Trash from "./pages/Trash";
import SpamFolder from "./pages/SpamFolder";
import IndividualMailPage from "./pages/IndividualMailPage";
import NotFound from "./pages/error/Error404";

function App() {
  return (
    <>
      <h1>BRU's mailbox</h1>
      <div className="components">
        <Header />
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/spam" element={<SpamFolder />} />
          <Route path="/:mailId" element={<IndividualMailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
