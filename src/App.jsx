import React, { lazy, Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider, useCities } from "./contexts/CitiesContext";
//auth context
import { AuthProvider, useAuth } from "./contexts/FakeAuthContext";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import SpinnerFullPage from "./components/SpinnerFullPage";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import HomePage from "./Pages/Homepage";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
const HomePage = lazy(() => import("./Pages/Homepage"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Product = lazy(() => import("./Pages/Product"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
//contexts
//data context

export default function App() {
  // we are fetching the data through a fake api and passing it as a prop to all components
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                {/* here id is a param */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
