<script>
  import { Route, Navigate } from "svelte-router-spa";
  import { Container } from "UI";
  import Navbar from "../components/auth/Navbar.svelte";

  export let currentRoute;
  export let params = {};
</script>

<Container class="min-h-screen flex flex-col justify-center items-center">
  <Navbar />
  <Route {currentRoute} {params} />
</Container>
