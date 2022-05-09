import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import notFound from "./components/notFound/notFound";
import About from "./components/About/About"

// owo


          

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/recipe" component={RecipeCreate} />
          <Route path="/update/:id" component={RecipeCreate} />
          <Route path="/about" component={About} />
          <Route path="*" component={notFound} />
         
         

          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
