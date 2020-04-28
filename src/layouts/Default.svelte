<script>
  import { Route } from "svelte-router-spa";
  import Navbar from "../components/Navbar.svelte";
  import { Container } from "UI";

  export let currentRoute;
  export let params = {};
</script>

<Navbar />
<Container class="pt-16 min-h-screen">
  <Route {currentRoute} {params} />
</Container>
