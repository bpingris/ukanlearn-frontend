<script>
  import { Navigate } from "svelte-router-spa";
  import { Button, Row, Col } from "UI";
</script>

<Row
  class="bg-white transition-shadow duration-100 shadow hover:shadow-xl py-4
  rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3">
  <Col col="6" class="text-center">
    <div class="hover:underline">
      <Navigate to="/login">Se connecter</Navigate>
    </div>
  </Col>
  <Col col="6" class="text-center">
    <div class="hover:underline">
      <Navigate to="/signup">S'inscrire</Navigate>
    </div>
  </Col>
</Row>
