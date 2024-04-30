import { MainContainer } from "./components/MainContainer";
import "./styles/global.scss";
import "./App.scss";
import Authentication from "./components/Authentication";
import { useAppSelector } from "./store/store";
import { useEffect } from "react";
import { getUserHandler, refreshTokenHandler } from "./utils/getUserHandler";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useAppSelector((store) => store.auth);
  let firstRender = true;

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      getUserHandler()
        .then((data) => dispatch(setUserDetails(data)))
        .catch((error) => console.log(error));
    }

    let interval = setTimeout(() => {
      refreshTokenHandler()
        .then((data) => dispatch(setUserDetails(data)))
        .catch((error) => console.log(error));
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      {user.email && user.email ? <MainContainer /> : <Authentication />}
    </div>
  );
}

export default App;
