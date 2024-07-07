import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import Home from "./components/Home";
import AuthBoard from "./components/AuthBoard";
import { fetchUserDetailsAction } from "./store/slices/vendorSlice";
import "./styles/global.scss";
import "./App.scss";
import { Spin } from "antd";

function App() {
  const { vendor, loading } = useAppSelector((store) => store.authSlice);
  const refreshToken = localStorage.getItem("refreshToken");
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();

  // GET USER DETAILS AT INITIALS
  useEffect(() => {
    if (refreshToken && token) dispatch(fetchUserDetailsAction());
    else {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
    }
  }, [dispatch, refreshToken, token]);

  return (
    <div className="App">
      {loading ? (
        <Spin tip="Loading" size="large" className={"spinning"} />
      ) : vendor && vendor?.email && vendor?.username ? (
        <Home />
      ) : (
        <AuthBoard />
      )}
    </div>
  );
}

export default App;
