<script>
  import { fly, fade } from "svelte/transition";
  import {
    Modal,
    TextError,
    Col,
    Input,
    Button,
    Card,
    Loading
  } from "@UI";
  import { client } from "api/http";
  export let currentRoute;
  export let params;
  currentRoute;
  params;

  export let usernameOrEmail = "";

  let show = false;
  let loading = false;
  let error = null;

  async function handleSubmit() {
    loading = true;
    error = null;
    try {
      await client.post("/auth/forgot_password", { usernameOrEmail });
      show = true;
    } catch (err) {
      if (err.response.status === 400) {
        error = "Vous devez indiquer un nom d'utilisateur ou une adresse mail";
      } else {
        error = err.response.data.error;
      }
    } finally {
      loading = false;
    }
  }
</script>

<style>
  .form-loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-loading .overlay {
    position: absolute;
    z-index: 49;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #0002;
  }
</style>

<Col col="12" sm="10" md="8" lg="6" xl="4">
  <form
    class="relative"
    class:form-loading={loading}
    on:submit|preventDefault={handleSubmit}>
    {#if loading}
      <div transition:fade={{ duration: 200 }} class="overlay" />
      <div transition:fly={{ y: 20, duration: 200 }} class="absolute z-50">
        <Loading />
      </div>
    {/if}
    <Card class="my-4 w-full z-10 relative">
      <div slot="title">J'ai oublié mon mot de passe</div>
      <div slot="subtitle">Entrez votre nom d'utilisateur ou votre email</div>
      <div slot="content">
        <div class="flex flex-col">
          <Input
            bind:value={usernameOrEmail}
            class="mb-5"
            label="Nom d'utilisateur/Email"
            type="text" />
          <TextError message={error} />
        </div>
      </div>
      <div slot="actions">
        <Button type="submit">Réinitialiser mon mot de passe</Button>
      </div>
    </Card>
  </form>
</Col>

<Modal bind:show>
  <Card>
    <div slot="title">C'est bon !</div>
    <div slot="subtitle">Regardez vos mails</div>
    <div slot="content">
      Un email a été envoyé au compte correspondant à "{usernameOrEmail}".
      <br />
      Ce mail contient un lien pour réinitialiser votre mot de passe !
    </div>
    <div slot="actions">
      <Button on:click={() => (show = false)}>Fermer</Button>
    </div>
  </Card>
</Modal>
