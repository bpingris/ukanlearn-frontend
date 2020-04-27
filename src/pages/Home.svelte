<script>
  import { Navigate } from "svelte-router-spa";
  import { Container } from "UI";

  export let currentRoute = "";
  export let params = "";
  params;
  currentRoute;
</script>

<Container>
  <div>home</div>
  <Navigate to="/login">qwe</Navigate>
</Container>
