import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
import Settings from "./pages/settings/Settings"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Layout from "./components/layout/Layout"
import { useGlobalContext } from "./context/context"

function App() {
  const {user} = useGlobalContext();
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="posts" element={<Home />}/>
      <Route path="post/:id" element={<Single />}/>
      <Route path="write" element={user ? <Write /> : <Login />}/>
      <Route path="settings" element={user ? <Settings /> : <Login />}/>
      <Route path="login" element={user ? <Home/> : <Login />}/>
      <Route path="register" element={user ? <Home />:<Register />}/>
    </Route>
  ))
  
  return (
    // <>

    //   <TopBar />
    //   {/* <Home /> */}
    //   {/* <Single /> */}
    //   {/* <Write /> */}
    //   {/* <Settings /> */}
    //   {/* <Login /> */}
    //   <Register />
    // </>
    <RouterProvider router={router}/>
    
  )
}

export default App
