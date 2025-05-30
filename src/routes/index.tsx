import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/layout';
import Studio from '../pages/Studio';
import Timeline from '../pages/Timeline';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Studio />,
      },
      {
        path: '/timeline',
        element: <Timeline />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
