import "./main.global.css";
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout/Layout";
import { Content } from "./shared/Content";
import { ToDoList } from "./shared/Content/ToDoList";
import { Timer } from "./shared/Content/Timer";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { RootReducer } from "./store/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StatisticsPage } from "./shared/StatisticsPage";

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

function AppComponent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Layout>
                <Header />
                <Content>
                  <ToDoList />
                  <Timer />
                </Content>
              </Layout>
            </Route>
            <Route path="/statistic">
              <Layout>
                <Header />
                <StatisticsPage />
              </Layout>
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));
