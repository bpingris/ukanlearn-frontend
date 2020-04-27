<script>
  import { navigateTo } from "svelte-router-spa";
  import { client } from "api/http";
  import { Card, Input, Button, Toast, Col } from "UI";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let toast = false;
  let email = "";
  let password = "";
  let username = "";
  let confirm = "";
  let message = "";
  let theme = "primary";

  async function signup() {
    toast = false;
    message = "";
    try {
      await client.post("/signup", {
        email,
        password,
        confirm,
        username
      });
      openToast("success", "Votre compte a ete cree");
      navigateTo("login");
    } catch (error) {
      if (error.response.status === 400) {
        openToast("warning", error.response.data.message);
      } else {
        openToast("warning", error.response.data.error);
      }
      openToast("danger", m);
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
  <Card class="w-full z-10 relative">
    <div slot="title">Inscription</div>
    <div slot="subtitle">Entrez vos identifiants</div>
    <div slot="content">
      <div class="flex flex-col">
        <Input bind:value={email} class="mb-5" label="Adresse mail" />
        <Input bind:value={username} class="mb-5" label="Nom d'utilisateur" />
        <Input bind:value={password} class="mb-5" label="Mot de passe" />
        <Input bind:value={confirm} label="Confimer" />
      </div>
    </div>
    <div slot="actions">
      <Button on:click={signup}>S'inscrire</Button>
    </div>
  </Card>
</Col>
