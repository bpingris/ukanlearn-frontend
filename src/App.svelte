<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./router";
</script>

<div class="bg-gray-200">
  <Router {routes} />
</div>
