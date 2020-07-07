import React from "react";
import MenuTop from "./components/MenuTop";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Movie from "./pages/movie/";
import Popular from "./pages/popular";
import NewMovies from "./pages/new-movies";
import Search from "./pages/search";
import Error404 from "./pages/error-404";

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout className="app">
      <Router>
        <Header style={{ zIndex: 999 }}>
          <MenuTop></MenuTop>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies" exact={true}>
              <NewMovies />
            </Route>
            <Route path="/popular" exact={true}>
              <Popular />
            </Route>
            <Route path="/search" exact={true}>
              <Search />
            </Route>

            {/* Dynamic route */}
            <Route path="/movie/:id" exact={true}>
              <Movie />
            </Route>

            {/* Error 404 */}
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
