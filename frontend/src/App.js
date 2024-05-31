import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Landing from './pages/Landing';
import History from './pages/History';
import Bills from './pages/Bills';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "/history",
    element: <History/>
  },
  {
    path: "/bills",
    element: <Bills/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </> 
  );
}

export default App;
