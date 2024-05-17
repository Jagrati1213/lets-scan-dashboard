import { useAppSelector } from "./store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/slices/userSlice";
import { getUserDetails } from "./utils/getUserHandler";
import Home from "./components/Home";
import AuthBoard from "./components/AuthBoard";
import "./styles/global.scss";
import "./App.scss";

function App() {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useDispatch();

  // GET USER DETAILS AT INITIALS
  useEffect(() => {
    getUserDetails()
      .then((data) => dispatch(setUserDetails(data)))
      .catch((error) => console.log("ERROR IN GET USER DETAILS, ", error));
  }, []);

  return (
    <div className="App">
      {user.email || user.username ? <Home /> : <AuthBoard />}
    </div>
  );
}

export default App;
