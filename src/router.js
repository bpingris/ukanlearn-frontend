import { get } from "svelte/store";

import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import Signup from "./pages/Signup.svelte";
import Search from "./pages/Search.svelte";
import Profile from "./pages/Profile.svelte";
import Create from "./pages/Create.svelte";
import Editor from './pages/Editor.svelte';
import Tune from './pages/Tune.svelte';
import Player from './pages/Player.svelte'

import ForgotPassword from './pages/ForgotPassword.svelte';
import MailVerification from './pages/MailVerification.svelte';
import ResetPassword from './pages/ResetPassword.svelte';

import DefaultLayout from "./layouts/Default.svelte";
import BlankLayout from "./layouts/Blank.svelte";
import AuthLayout from "./layouts/Auth.svelte";

import { user } from "store/user";

function isLogged() {
  const v = get(user);
  return !!v.token;
}

const guardLogged = { guard: isLogged, redirect: "/login" };

const routes = [
  { name: "/", component: Home, layout: BlankLayout },

  { name: "login", component: Login, layout: AuthLayout },
  { name: "signup", component: Signup, layout: AuthLayout },
  { name: "forgot_password", component: ForgotPassword, layout: AuthLayout },
  {
    name: "search",
    component: Search,
    layout: DefaultLayout,
    onlyIf: guardLogged,
  },
  {
    name: "profile",
    component: Profile,
    layout: DefaultLayout,
    onlyIf: guardLogged,
  },
  {
    name: "create",
    component: Create,
    layout: DefaultLayout,
    onlyIf: guardLogged,
  },
  {
    name: "editor",
    component: Editor,
    layout: DefaultLayout,
    onlyIf: guardLogged
  },
  {
    name: "player/:id",
    component: Player,
    layout: DefaultLayout,
    onlyIf: guardLogged
  },
  {
    name: "tune",
    component: Tune,
    layout: DefaultLayout,
    onlyIf: guardLogged
  },
  {
    name: "mail_verification/:token",
    component: MailVerification,
    layout: BlankLayout
  },
  {
    name: "reset_password/:token",
    component: ResetPassword,
    layout: BlankLayout
  }
];

export { routes };
