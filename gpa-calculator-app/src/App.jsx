import React from "react";
import AppRouter from "./Router.jsx";
import "./App.css";
import { LanguageProvider } from "./LanguageContext.jsx";

function App() {
  return (
    <LanguageProvider>
      <div className="App !min-h-full !pb-20">
        <AppRouter />
      </div>
    </LanguageProvider>
  );
}

export default App;
