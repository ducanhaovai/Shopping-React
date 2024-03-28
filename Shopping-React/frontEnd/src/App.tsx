import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <AppRouter />
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
