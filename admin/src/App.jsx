import NavBar from './componets/NavBar';
import ListUser from './pages/ListUser';
import Login from './pages/Login';
import HandleProduct from './pages/HandleProduct';
import HandleUser from './pages/HandleUser';
import ProductList from './pages/ListProduct';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Footer from './componets/Footer';
import { loginByToken } from './redux/callAPI';
import { useEffect } from 'react';
import Loading from './componets/Loading';


const App = () => {
  const { admin } = useSelector( state => state.admin );
  const dispatch = useDispatch();
  useEffect( () => {
    localStorage.getItem( "accessToken" ) && loginByToken( dispatch );
  }, [ dispatch ] )

  const User = () => {
    return (
      <>
        <Loading />
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </>
    )
  }

  const UIApp = () => {
    return (
      <>
        <NavBar admin={ admin.username } />
        <Loading />
        <Switch>
          <Route path="/app/user/:id">
            <HandleUser />
          </Route>
          <Route exact path="/app/user">
            <HandleUser />
          </Route>
          <Route path="/app/product/:id">
            <HandleProduct />
          </Route>
          <Route exact path="/app/product">
            <HandleProduct />
          </Route>
          <Route exact path="/app/products">
            <ProductList />
          </Route>
          <Route exact path="/app">
            <ListUser />
          </Route>
        </Switch>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/app">
            { admin ? <UIApp /> : <Redirect to="/" /> }
          </Route>
          <Route exact path="/">
            { admin ? <Redirect to="/app" /> : <User /> }
          </Route>
        </Switch>
      </Router>
    </>
  )

}

export default App;
