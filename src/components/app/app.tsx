import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protectedRoute/protectedRoute';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slice/ingredients/ingredientsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { background?: Location };

  const matchFeedOrder = useMatch('/feed/:number');
  const matchProfileOrder = useMatch('/profile/orders/:number');
  const orderNumber =
    matchFeedOrder?.params.number || matchProfileOrder?.params.number;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${orderNumber}`} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <Modal title={`#${orderNumber}`} onClose={() => navigate(-1)}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
