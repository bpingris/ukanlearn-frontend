<script>
  import { onMount } from "svelte";
  import { Modal, Button, Input, Card } from "@UI";
  import { client } from "api/http";
  import { toasts } from "store/toasts";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let password;
  let confirm;
  let loading = false;
  let show = false;
  let success = false;

  onMount(() => {
    if (
      !currentRoute.namedParams.token ||
      currentRoute.namedParams.token.length === 0
    ) {
      show = true;
      return;
    }
  });

  async function savePassword() {
    loading = true;
    try {
      await client.patch(
        `/auth/forgot_password/reset/${currentRoute.namedParams.token}`,
        {
          password,
          confirm
        }
      );
      success = true;
    } catch (error) {
      toasts.warning(
        error.response.data.error ||
          "Impossible de mettre a jour votre mot de passe"
      );
    }
    loading = false;
  }
</script>

{#if !show}
  <div class="min-h-screen flex items-center justify-center">
    <Card>
      <div slot="title">Reinitialiser votre mot de passe</div>
      <div slot="subtitle">
        Remplissez les champs avec votre nouveau mot de passe
      </div>
      <div slot="content">
        <div class="flex flex-col">
          <Input
            bind:value={password}
            class="mb-5"
            label="Mot de passe"
            type="password" />
          <Input
            bind:value={confirm}
            label="Confirmer le mot de passe"
            type="password" />
        </div>
      </div>
      <div slot="actions">
        <Button clear to="/login">Retour</Button>
        <Button on:click={savePassword}>Enregistrer</Button>
      </div>
    </Card>
  </div>
{/if}

<Modal canClose={false} bind:show>
  <Card>
    <div slot="title">Une erreur est survenue :(</div>
    <div slot="subtitle">Il n'y pas de token ou il n'est pas valide !</div>
    <div slot="content">
      Impossible de reinitialiser votre mot de passe
      <br />
      Assurez vous d'avoir selectionne le bon lien dans votre mail !
    </div>
    <div slot="actions">
      <Button to="/login">Ok</Button>
    </div>
  </Card>
</Modal>

<Modal bind:show={success} canClose={false}>
  <Card>
    <div slot="title">Mot de passe mis a jour !</div>
    <div slot="subtitle">Operation reussie</div>
    <div slot="content">
      Votre mot de passe a bien ete mis a jour
      <br />
      Vous pouvez vous connecter
    </div>
    <div slot="actions">
      <Button to="/login">Se connecter</Button>
    </div>
  </Card>
</Modal>
