import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Studio from '../pages/Studio';
import Timeline from '../pages/Timeline';
import { Header } from '../components/header';

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
  return (
    <div className="h-screen w-screen bg-background">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
};

export default Routes;