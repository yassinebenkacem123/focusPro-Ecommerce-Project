import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { fetchCurrentUser } from './features/authentication/authSlice.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Re-hydrate auth from the backend cookie on hard refresh.
store.dispatch(fetchCurrentUser());
createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </StrictMode>
    </Provider>
  </BrowserRouter>
)
