<script>
  import { Route } from "svelte-router-spa";
  import { Container } from "UI";

  export let currentRoute;
  export let params = {};
</script>

<Container>
  <Route {currentRoute} {params} />
</Container>
