import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Wisata from "./components/Wisata";
import Add from "./components/AddWisata";
import Edit from "./components/Edit";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import List from "./components/List";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/Edit/:id">
          <Edit />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/Home">
          <Navbar />
          <Home />
          <Footer />
        </Route>
        <Route path="/About">
          <Navbar />
          <About />
          <Footer />
        </Route>
        <Route path="/List">
          <Navbar />
          <List />
          <Footer />
        </Route>
        <Route path="/Wisata">
          <Navbar />
          <Wisata />
          <Footer />
        </Route>
        <Route path="/AddWisata">
          <Navbar />
          <Add />
          <Footer />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;