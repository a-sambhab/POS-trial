import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import History from "./pages/History";
import AddItem from "./pages/AddItem";
import AddCustomer from "./pages/AddCustomer";
import UpdateCustomer from "./pages/UpdateCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/additem",
    element: <AddItem />,
  },
  {
    path: "/addCustomer",
    element: <AddCustomer />,
  },
  {
    path: "/updateCustomer",
    element: <UpdateCustomer />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
