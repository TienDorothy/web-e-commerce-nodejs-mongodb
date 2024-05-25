import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  CartPage,
  CheckoutPage,
  DetailPage,
  ErrorPage,
  HomePage,
  LoginPage,
  RegisterPage,
  Root,
  ShopPage,
  Setting,
  HistoryPage,
} from './pages';

import { loader as rootLoader } from './pages/Root';
import { loader as historyLoader } from './pages/HistoryPage';
//////
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    id: 'root',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'shop',
        id: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'detail',
        id: 'detail',
        children: [
          {
            path: ':productId',
            element: <DetailPage />,
          },
        ],
      },

      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'setting', element: <Setting /> },
      { path: 'history', element: <HistoryPage /> , loader:historyLoader, id: 'history'},
    ],
  },
]);
////
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
