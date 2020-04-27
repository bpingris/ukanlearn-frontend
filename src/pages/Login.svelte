<script>
  import { onMount } from "svelte";
  import { user } from "store/user";
  import { client } from "api/http";
  import { Card, Input, Button, Toast, Col } from "UI";

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
    <Card class="w-full">
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
