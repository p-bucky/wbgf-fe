import { createBrowserRouter, RouterProvider } from "react-router";
import { BidScreen, HomeScreen } from "./screens";
import { ThirdwebProvider } from "thirdweb/react";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomeScreen />,
  },
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/bid",
    element: <BidScreen />,
  },
]);

function App() {
  return (
    <ThirdwebProvider>
      <RouterProvider router={router} />
    </ThirdwebProvider>
  );
}

export default App;
