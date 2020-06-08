<script>
  import { Navigate } from "svelte-router-spa";
  import { Card, Container, Row, Col, Button } from "@UI";
  export let currentRoute = "";
  export let params = "";
  params;
  currentRoute;
</script>

<nav
  class="fixed w-full top-0 shadow z-10 bg-white px-5 h-16 flex items-center
  justify-between">
  <a class="uppercase text-3xl font-thin" href="/">Ukanlearn</a>
  <div data-idk="actions">
    <a class="mx-2" href="/login">Connexion</a>
    <a class="mx-2" href="/signup">Inscription</a>
  </div>
</nav>
<section class="pt-16 h-screen container mx-auto px-5">
  <h1 class="text-6xl font-light">Ukanlearn</h1>
  <h2 class="text-3xl font-light">
    Apprenez à jouer un instrument comme dans Guitar Hero
  </h2>
  <img
    class="mx-auto"
    style="max-width: 650px"
    src="./images/coding.svg"
    alt="" />
  <svg
    class="absolute left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320">
    <path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,256L40,245.3C80,235,160,213,240,181.3C320,149,400,107,480,112C560,117,640,171,720,202.7C800,235,880,245,960,229.3C1040,213,1120,171,1200,144C1280,117,1360,107,1400,101.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
  </svg>
</section>

<Container class="shadow-lg mt-10">

  <section class="bg-white p-8">
    <h2 class="text-3xl font-light">Créez vos propres musiques</h2>
    <Row class="items-center" gap>
      <Col col="8" sm="6">
        <p>
          A l'aide de l'éditeur de
          <b>Ukanlearn</b>
          , vous pouvez créer vos musiques en sélectionnant les accords voulus !
        </p>
      </Col>
      <Col col="4" sm="6">
        <img src="./images/building_blocks.svg" alt="" />

      </Col>
    </Row>
  </section>

  <section class="bg-gray-100 p-8">
    <h2 class="text-3xl font-light">
      Recherchez les créations des autres utilisateurs
    </h2>
    <Row class="items-center" gap>
      <Col col="4" sm="6">
        <img src="./images/contemplating.svg" alt="" />
      </Col>
      <Col col="8" sm="6">
        <p>
          Notre puissant moteur de recherche vous permet de chercher les
          musiques sur notre plateforme en un instant !
        </p>
      </Col>
    </Row>
  </section>

  <section class="bg-white p-8">
    <h2 class="text-3xl font-light">
      Lancez-vous et entrainez-vous sur vos morceaux favoris
    </h2>
    <Row class="items-center" gap>
      <Col col="8" sm="6">
        <p>
          Créez, trouvez, puis entraînez-vous sur la musique de votre choix !
        </p>
        <p>
          Le lecteur vous permet de mettre en pause, changez la vitesse de
          lecture, et vous affiche de manière ludique votre musique
        </p>
      </Col>
      <Col col="4" sm="6">
        <img src="./images/having_fun.svg" alt="" />
      </Col>
    </Row>
  </section>

  <section class="bg-gray-100 p-8">
    <h2 class="text-3xl font-light">
      Inscrivez-vous pour essayer Ukanlearn, c'est gratuit !
    </h2>
    <Row class="justify-center">
      <Col col="12" sm="10" md="8">
        <Row class="justify-center items-center mt-5" gap>
          <Col col="12" sm="6">
            <Card class="relative">
              <div slot="title">Inscrivez-vous</div>
              <div slot="subtitle">C'est gratuit !</div>
              <svg
                class="bottom-0 left-0 absolute z-0"
                xmlns="http://www.w3.org/2000/svg"
                slot="content"
                viewBox="0 0 1440 320">
                <path
                  fill="#0066ff66"
                  fill-opacity="1"
                  d="M0,192L40,181.3C80,171,160,149,240,138.7C320,128,400,128,480,149.3C560,171,640,213,720,234.7C800,256,880,256,960,213.3C1040,171,1120,85,1200,80C1280,75,1360,149,1400,186.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />

              </svg>
              <div class="z-10" slot="actions">
                <Button to="/signup">Inscription</Button>
              </div>
            </Card>
          </Col>
          <Col col="12" sm="6">
            <Card class="relative">
              <div slot="title">Connectez-vous</div>
              <div slot="subtitle">C'est également gratuit !</div>
              <svg
                class="bottom-0 left-0 absolute z-0"
                xmlns="http://www.w3.org/2000/svg"
                slot="content"
                viewBox="0 0 1440 320">
                <path
                  fill="#0099ff33"
                  fill-opacity="1"
                  d="M0,0L40,37.3C80,75,160,149,240,176C320,203,400,181,480,149.3C560,117,640,75,720,74.7C800,75,880,117,960,149.3C1040,181,1120,203,1200,224C1280,245,1360,267,1400,277.3L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />

              </svg>
              <div class="z-10" slot="actions">
                <Button to="/login">Connexion</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
</Container>
