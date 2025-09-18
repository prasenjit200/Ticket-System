// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Signin-page";
import SignUp from "./pages/Signup-page";
import DashboardPage from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import Layout from "./components/Layout";
import TicketDetailPage from "./pages/TicketDetailsPage";
import UserTicket from "./pages/UsuerTicketPage";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard routes with Layout */}
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="ticket/:id" element={<TicketDetailPage />} />
          <Route path="userticket/:id"element={<UserTicket/>}/>
        </Route>

        {/* Fallback redirect */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
