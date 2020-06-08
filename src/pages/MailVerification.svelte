<script>
  import { onMount } from "svelte";
  import { Loading, Button, Card, Modal } from "@UI";
  import { client } from "api/http";
  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let loading = false;
  let show = false;
  let activation = null;
  onMount(() => {
    if (
      !currentRoute.namedParams.token ||
      currentRoute.namedParams.token.length === 0
    ) {
      show = true;
      return;
    }
    activateAccount();
  });

  function activateAccount() {
    activation = client.get(
      `/auth/confirmation/${currentRoute.namedParams.token}`
    );
  }
</script>

<Modal canClose={false} bind:show>
  <Card>
    <div slot="title">Une erreur est survenue :(</div>
    <div slot="subtitle">Il n'y pas de token ou il n'est pas valide !</div>
    <div slot="content">
      Nous ne pouvons pas activer votre compte sans token
    </div>
    <div slot="actions">
      <Button to="/signup">Ok</Button>
    </div>
  </Card>
</Modal>

{#if !show}
  <div class="flex min-h-screen items-center justify-center">
    {#await activation}
      <Card>
        <div slot="title">Un instant...</div>
        <div slot="subtitle">Nous sommes en train d'activer votre compte</div>
        <div slot="content" class="text-center">
          <Loading />
        </div>
      </Card>
    {:then data}
      <Card>
        <div slot="title">Parfait !</div>
        <div slot="subtitle">Votre compte a été activé !</div>
        <div slot="content">
          Vous pouvez maintenant vous connecter à
          <strong>Ukanlearn</strong>
        </div>
        <div slot="actions">
          <Button to="/login">Se connecter</Button>
        </div>
      </Card>
    {:catch error}
      <Card>
        <div slot="title">Aie !</div>
        <div slot="subtitle">Une erreur est survenue</div>
        <div slot="content">
          <img
            class="rounded"
            src="https://www.picgifs.com/gifs/gifs/fail/fail-bCLv8P.gif"
            alt="Erreur !" />
          <div class="text-center my-2">
            {error.response.data.error || "Impossible d'activer votre compte"}
          </div>
        </div>
        <div slot="actions">
          <Button to="/signup">Créer un compte</Button>
        </div>
      </Card>
    {/await}
  </div>
{/if}
