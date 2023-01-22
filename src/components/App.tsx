import { ROUTES } from '@/constants/routes';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Registration from '@/pages/Registration/Registration';
import User from '@/pages/User/User';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

const App: FC = () => {
  const userAuth = useTypedSelector((state) => state.authSlice.token);
  return (
    <div className='h-full'>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.main}
            element={userAuth ? <Navigate to={ROUTES.home} /> : <Login />}
          />
          <Route path={ROUTES.register} element={<Registration />} />
          <Route
            path={ROUTES.home}
            element={userAuth ? <Home /> : <Navigate to={ROUTES.main} />}
          />
          <Route
            path={ROUTES.profile}
            element={userAuth ? <User /> : <Navigate to={ROUTES.main} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
