import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <main>
      <h1>ShadowMap</h1>
      <p>See your digital footprint. Take control of your privacy.</p>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
