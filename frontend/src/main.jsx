import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js';

import PrivateRoute from './components/PrivateRoute.jsx';

import AdminRoute from './pages/Admin/AdminRoute.jsx';

import Login from './pages/Auth/login.jsx'
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/User/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element= {<App />}>

    <Route path='' element={<PrivateRoute />} >
      <Route path='/profile' element={<Profile />} />
    </Route>

    <Route path = '/Login' element={<Login/>}/>
    <Route path = "/register" element={<Register/>} />

    <Route path='/admin' element={<AdminRoute/>}> 

    </Route>

  </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
);