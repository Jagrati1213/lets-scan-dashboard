import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import Home from "./components/Home";
import AuthBoard from "./components/AuthBoard";
import { fetchUserDetailsAction } from "./store/slices/userSlice";
import "./styles/global.scss";
import "./App.scss";

function App() {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  // GET USER DETAILS AT INITIALS
  useEffect(() => {
    dispatch(fetchUserDetailsAction());
  }, [dispatch]);

  return (
    <div className="App">
      {user.email || user.username ? <Home /> : <AuthBoard />}
    </div>
  );
}

export default App;
