import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import ProdsPage from "./pages/ProdsPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import ProdNewPage from "./pages/ProdNewPage";
import ProdUpdatePage from "./pages/ProdUpdatePage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./router/ProtectedRoute";

//////
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ProtectedRoute element={<DashboardPage />} /> },
      // { index: true, element: <DashboardPage /> },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProtectedRoute element={<ProdsPage />} />,
          },
          {
            path: "new",
            element: <ProtectedRoute element={<ProdNewPage />} />,
          },
          {
            path: ":productId",
            element: <ProtectedRoute element={<ProdUpdatePage />} />,
          },
        ],
      },
      {
        path: "orders",
        children: [
          { index: true, element: <ProtectedRoute element={<OrderPage />} /> },
          {
            path: ":orderId",
            element: <ProtectedRoute element={<OrderDetailPage />} />,
          },
        ],
      },

      { path: "login", element: <LoginPage /> },
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
