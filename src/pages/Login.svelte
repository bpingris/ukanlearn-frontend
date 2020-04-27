<script>
  import { client } from "api/http";
  import { Card, Input, Button, Toast, Col } from "UI";

  async function login() {
    try {
      const r = await client.post("/login", {
        email,
        password
      });
      console.log(r);
    } catch (error) {
      if (error.response.status === 400) {
        message = error.response.data.message;
      } else {
        message = error.response.data.error;
      }
      console.error({ e: error });
    }
    toast = true;
  }

  function close() {
    toast = false;
  }
  let toast = false;
  let email = "";
  let password = "";
  let message = "";
</script>

<Toast active={toast} {message} on:close={close} />
<Col col="12" sm="10" md="8" lg="6" xl="4">
  <Card class="w-full">
    <div slot="title">Connexion</div>
    <div slot="subtitle">Entrez vos identifiants</div>
    <div slot="content">
      <div class="flex flex-col">
        <Input bind:value={email} class="mb-5" label="Adresse mail" />
        <Input bind:value={password} label="Mot de passe" />
      </div>
    </div>
    <div slot="actions">
      <Button on:click={login}>Connexion</Button>
    </div>
  </Card>
</Col>
