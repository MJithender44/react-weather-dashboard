import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import HeaderComponent from "./components/Header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";
import HomeContainer from "./containers/home/HomeContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/weather/Search";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`bg-${theme} tracking-wider border-box wrapper`}>
        <div>
          <HeaderComponent />
        </div>
        <Switch>
          <Route path="/" exact={true} component={HomeContainer} />
          <Route path="/city" exact={true} component={Search} />
        </Switch>
        <div>
          <FooterComponent />
        </div>
      </div>
    </Router>
  );
}

export default App;
