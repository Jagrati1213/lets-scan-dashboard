import { MainContainer } from "./components/MainContainer";
import "./styles/global.scss";
import "./App.scss";
import Authentication from "./components/Authentication";
import { useAppSelector } from "./store/store";

function App() {
  const auth = useAppSelector((store) => store.auth);
  console.log(auth);
  return (
    <div className="App">
      {auth.userName && auth.password ? <MainContainer /> : <Authentication />}
    </div>
  );
}

export default App;
