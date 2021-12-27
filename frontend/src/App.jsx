import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from './componets/NavBar';
import Footer from './componets/Footer';
import { useEffect } from 'react';
import { loginByGoogle, loginByToken } from "./redux/callAPI";
import Loading from "./componets/Loading";

function App() {
  const dispatch = useDispatch();
  console.log( process.env.ngusi )

  useEffect( () => {
    localStorage.getItem( "accessToken" ) && loginByToken( dispatch );
  }, [ dispatch ] )

  useEffect( () => {
    !( localStorage.getItem( "accessToken" ) ) && loginByGoogle( dispatch );
  }, [ dispatch ] )

  const User = () => {
    const { user } = useSelector( state => state.user );
    let { path } = useRouteMatch();
    return (
      <>
        <Loading />
        <Switch>
          <Route path={ `${ path }/login` }>
            { user ? <Redirect to="/" /> : <Login /> }
          </Route>
          <Route path={ `${ path }/register` }>
            { user ? <Redirect to="/" /> : <Register /> }
          </Route>
        </Switch>
      </>
    )
  }

  const UIApp = () => {
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Loading />
        <Footer />
      </>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/">
          <UIApp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
