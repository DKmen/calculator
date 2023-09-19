import { BrowserRouter, Routes, Route } from "react-router-dom";
import path from "./constant/path";
import DashboardPage from "./pages/dashboard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setKeys } from "./data/container/keys";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setKeys([{ id: 1, title: "People Value", value: 10 }, { id: 2, title: "Employee Text", value: 20 }, { id: 3, title: "Employee Salary", value: 30 }]))
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={path.HOME} element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
