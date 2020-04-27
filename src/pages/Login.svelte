<script>
  import { onMount } from "svelte";
  import { user } from "store/user";
  import { client } from "api/http";
  import { Row, Card, Input, Button, Toast, Col } from "UI";

  export let currentRoute = "";
  export let params = "";
  currentRoute;
  params;

  let toast = false;
  let email = "";
  let password = "";
  let message = "";
  let theme = "primary";

  onMount(() => {
    console.log(user);
    user.subscribe(console.log);
  });

  async function login() {
    const error = await user.login(email, password);
    if (!error) {
      openToast("primary", "Success");
    } else {
      console.log({ e: error.response });
      if (error.response.status === 400) {
        openToast("warning", error.response.data.message);
      } else {
        openToast("warning", error.response.data.error);
      }
    }
  }

  function openToast(t, m) {
    theme = t;
    message = m;
    toast = true;
  }

  function close() {
    toast = false;
  }
</script>

<Toast active={toast} {theme} {message} on:close={close} />
<Col col="12" sm="10" md="8" lg="6" xl="4">
  <form on:submit|preventDefault={login}>
    <Card class="w-full z-10 relative">
      <div slot="title">Connexion</div>
      <div slot="subtitle">Entrez vos identifiants</div>
      <div slot="content">
        <div class="flex flex-col">
          <Input bind:value={email} class="mb-5" label="Adresse mail" />
          <Input bind:value={password} label="Mot de passe" type="password" />
        </div>
      </div>
      <div slot="actions">
        <Button type="submit">Connexion</Button>
      </div>
    </Card>
  </form>
</Col>

<Row
  class="bg-white shadow z-10 py-4
  rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3">
  <Col col="12" class="text-center">
    <a class="hover:text-black text-gray-600 transition duration-100" href="/login">J'ai oublie mon mot de passe</a>
  </Col>
</Row>
