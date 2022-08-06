import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [signinUser, setSigninUser] = useContext(UserContext);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        signinUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;