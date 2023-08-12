import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Tailwind CSS
import "./index.css";

import rootReducer from "./reducers";
const middlewares = [thunk];

const store: any = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
