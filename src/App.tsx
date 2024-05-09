import { MainContainer } from "./components/MainContainer";
import "./styles/global.scss";
import "./App.scss";
import Authentication from "./components/Authentication";
import { useAppSelector } from "./store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/slices/userSlice";
import { apiClient } from "./global";
import { getUserDetails } from "./utils/getUserHandler";

function App() {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails()
      .then((data) => dispatch(setUserDetails(data)))
      .catch((error) => console.log("ERROR IN GET USER DETAILS, ", error));
  }, []);
  return (
    <div className="App">
      {user.email || user.userName ? <MainContainer /> : <Authentication />}
    </div>
  );
}

export default App;
