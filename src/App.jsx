import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import "./App.css";
import { router } from "./router/appRouter";
import Loading from "./components/utils/Loading";
import useAppInitialization from "./hook/useAppInitialization";
function App() {
  useAppInitialization();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={2000} position="top-center" />
      </Suspense>
    </>
  );
}

export default App;
