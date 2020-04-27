<script>
  import { Navigate } from "svelte-router-spa";
  import { Button, Row, Col } from "UI";
  export let currentRoute;

  const linkActive = "text-black font-bold";
  $: loginClasss = `hover:underline ${
    currentRoute.name === "/login" ? linkActive : "text-gray-600"
  }`;
  $: signupClass = `hover:underline ${
    currentRoute.name === "/signup" ? linkActive : "text-gray-600"
  }`;
</script>

<Row
  class="bg-white shadow py-4 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-1/2
  xl:w-1/3">
  <Col col="6" class="text-center">
    <a class={loginClasss} href="/login">Se connecter</a>
  </Col>
  <Col col="6" class="text-center">
    <a class={signupClass} href="/signup">S'inscrire</a>
  </Col>
</Row>
