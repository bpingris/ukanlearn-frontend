import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import Signup from "./pages/Signup.svelte";
import DefaultLayout from "./layouts/Default.svelte";
import AuthLayout from "./layouts/Auth.svelte";

const routes = [
  { name: "/", component: Home },
  {
    name: "login",
    component: Login,
    layout: AuthLayout,
  },
  {
    name: "signup",
    component: Signup,
    layout: AuthLayout,
  },
];

export { routes };
