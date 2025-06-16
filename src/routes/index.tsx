import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Layout } from "../components/Layout"
import Studio from "../pages/Studio"
import { Productions } from "../pages/Productions"


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "production/:id",
        element: (
            <Studio />
        ),
      },
      {
        path: "/",
        element: (
          <Productions />
        ),
      }
    ]
  }
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
