import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import Home from "./components/Home";
import AuthBoard from "./components/AuthBoard";
import { fetchUserDetailsAction } from "./store/slices/venderSlice";
import "./styles/global.scss";
import "./App.scss";

function App() {
  const { vender, isAuthenticated } = useAppSelector(
    (store) => store.authSlice
  );
  const dispatch = useAppDispatch();

  // GET USER DETAILS AT INITIALS
  useEffect(() => {
    if (isAuthenticated) dispatch(fetchUserDetailsAction());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="App">
      {vender && vender?.email && vender?.username ? <Home /> : <AuthBoard />}
    </div>
  );
}

export default App;
