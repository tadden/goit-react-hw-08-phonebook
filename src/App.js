import { Suspense, useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { authOperations } from 'redux/auth';
import { authSelectors } from 'redux/auth';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import PrivateRoute from 'PrivateRoute';
import PublicRoute from 'PublicRoute';

const override = css`
  display: block;
  text-align: center;
  border-color: black;
`;

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './pages/HomePage'),
);
const RegisterPage = lazy(() =>
  import(/* webpackChunkName: "RegisterPage" */ './pages/RegisterPage'),
);
const LoginPage = lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ './pages/LoginPage'),
);
const ContactsPage = lazy(() =>
  import(/* webpackChunkName: "ContactsPage" */ './pages/ContactsPage'),
);
const NotFoundPage = lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage'),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />
        <Suspense fallback={<PropagateLoader css={override} size={15} />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/register"
              element={
                <PublicRoute restricted redirectTo="/login">
                  <RegisterPage />
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/login"
              element={
                <PublicRoute restricted redirectTo="/contacts">
                  <LoginPage />
                </PublicRoute>
              }
            ></Route>

            <Route path="*" element={<NotFoundPage />} />

            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <ContactsPage />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Suspense>
      </Container>
    )
  );
}
