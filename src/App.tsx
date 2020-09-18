import React from "react";
import Index from "./views/index";
import Settings from "./views/settings";
import Test from "./views/test";
import Results from "./views/results";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/settings/:surah">
            <Settings />
          </Route>
          <Route path="/test/:surah/:start/:finish">
            <Test />
          </Route>
          <Route path="/test/:surah">
            <Test />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
