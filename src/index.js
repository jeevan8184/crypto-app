import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import store from './store/store';
import {Provider} from 'react-redux'
import ErrorBoundary from './ErrorBoundary';
const root=ReactDOM.createRoot(document.getElementById('root'));

console.log(store);

root.render(
    <React.StrictMode>
      <BrowserRouter>
       <Provider store={store}>
       <ErrorBoundary>
          <App />
        </ErrorBoundary>
       </Provider>
      </BrowserRouter>
    </React.StrictMode>
)