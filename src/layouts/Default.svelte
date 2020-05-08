<script>
  import { Route } from "svelte-router-spa";
  import Navbar from "../components/Navbar.svelte";
  import { Container } from "@UI";

  export let currentRoute;
  export let params = {};
</script>

<Navbar />
<img class="fixed top-0 left-0 z-0 w-full" src="./images/waves.svg" alt="">
<Container class="pt-16 min-h-screen z-10 relative">
  <Route {currentRoute} {params} />
</Container>
