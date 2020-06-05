<script>
  import { navigateTo } from "svelte-router-spa";
  import { toasts } from "store/toasts";
  import { client } from "api/http";
  import { Card, Input, Button, Toast, Col } from "@UI";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let email = "";
  let password = "";
  let username = "";
  let confirm = "";
  let message = "";
  let theme = "primary";

  async function signup() {
    try {
      await client.post("/auth/signup", {
        email,
        password,
        confirm,
        username
      });
      toasts.success("Votre compte a ete cree");
      navigateTo("login");
    } catch (error) {
      if (error.response.status === 422) {
        toasts.warning(
          Object.entries(error.response.data.errors)
            .map(o => `${o[0]}: ${o[1]}<br>`)
            .toString()
            .replace(/,/g, "")
        );
      } else {
        toasts.warning(error.response.data.message);
      }
    }
  }
</script>

<Col col="12" sm="10" md="8" lg="6" xl="4">
  <form on:submit|preventDefault={signup}>
    <Card class="my-4 w-full z-10 relative">
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
        <Button type="submit">S'inscrire</Button>
      </div>
    </Card>
  </form>
</Col>
