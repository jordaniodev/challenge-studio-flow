import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Studio from '../pages/Studio';
import Timeline from '../pages/Timeline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Studio />,
  },
  {
    path: '/timeline',
    element: <Timeline />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;