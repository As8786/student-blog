import React from "react";
import { Route, Link, Redirect } from "react-router-dom";

import LogIn from "../LogIn/LogIn";
import SignUp from "../SignUp/SignUp";
import SingleArticleDisplay from "../SingleArticleDisplay/SingleArticleDisplay";
import ArticlesInList from "../ArticlesInList/ArticlesInList";
import AddArticles from "../AddArticles/AddArticles";
import SearchDisplay from "../Search/SearchDisplay";
import UserInformation from "../UserInformation/UserInformation";
import ModifyUserProfile from "../ModifyUserProfile/ModifyUserProfile";
import ModifyArticles from "../ModifyArticles/ModifyArticles";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" render={() => <ArticlesInList />} />
        <Route exact path="/login" render={props => <LogIn />} />
        <Route exact path="/signup" render={props => <SignUp />} />
        <Route
          exact
          path="/article/:id"
          render={props => <SingleArticleDisplay id={props.match.params.id} />}
        />
        <Route
          exact
          path="/:user/add-article"
          render={props => <AddArticles user_id={props.match.params.user} />}
        />
        <Route
          exact
          path="/articles/search/:category"
          render={props => (
            <SearchDisplay category={props.match.params.category} />
          )}
        />
        <Route
          exact
          path="/:user/profile"
          render={props => <UserInformation user={props.match.params.user} />}
        />
        <Route
          exact
          path="/:user/profile_modify"
          component={ModifyUserProfile}
        />
        <Route
          exact
          path="/:user/modify_article/:article"
          render={props => (
            <ModifyArticles
              article_id={props.match.params.article}
              user_id={props.match.params.user}
            />
          )}
        />
      </div>
    );
  }
}

export default Routes;
