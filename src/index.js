import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import App from './components/App/App';
import store from './components/store/store';

const container = document.getElementById('root');
const body = createRoot(container);

body.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
