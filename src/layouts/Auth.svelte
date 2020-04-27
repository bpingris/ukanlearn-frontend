<script>
  import { Route, Navigate } from "svelte-router-spa";
  import { Container } from "UI";
  import Waves from "../components/Waves.svelte";
  import Navbar from "../components/auth/Navbar.svelte";

  export let currentRoute;
  export let params = {};
</script>

<Container class="min-h-screen flex flex-col justify-center items-center">
  <Navbar {currentRoute} />
  <Route {currentRoute} {params} />
  <Waves />
</Container>
