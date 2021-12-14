import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobMonitorView from "./views/jobMonitor";
import SettingsView from "./views/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobMonitorView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
