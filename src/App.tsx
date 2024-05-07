import LoginForm from "./_auth/forms/LoginForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import { Home } from "./_root/pages";
import "./globals.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>AuthLayout
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
