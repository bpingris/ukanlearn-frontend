<script>
  import { navigateTo } from "svelte-router-spa";
  import { onMount } from "svelte";
  import { Row, Col, Card, Label, Input, Button, Modal } from "@UI";
  import { user } from "store/user";
  import { client } from "api/http";
  import { exclude } from "utils/exclude";
  import Drafts from "../components/profile/Drafts.svelte";
  import Favourites from "../components/profile/Favourites.svelte";
  import Musics from "../components/profile/Musics.svelte";
  import Historic from "../components/profile/Historic.svelte";

  let loading = false;
  let updatePass = false;
  let currentPassword = "";
  let newPassword = "";
  let confirmNewpassword = "";
  let updateInfos = false;
  let username = $user.username;
  let email = $user.email;

  $: {
    if (!updateInfos) {
      username = $user.username;
      email = $user.email;
    }
  }

  async function me() {
    loading = true;
    await user.fetchMe();
    loading = false;
  }

  onMount(me);

  async function exportData() {
    const o = await client.get("/users/me/export");
    const url = window.URL.createObjectURL(
      new Blob([JSON.stringify(o.data.informations)], {
        type: "application/json",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ukanlearn_export.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  let confirmationDelete = false;

  async function deleteAccount() {
    try {
      await client.delete("/users/me");
      user.reset();
      navigateTo("/");
    } catch (err) {
      console.error(err);
    }
  }

  async function saveNewPassword() {
    try {
      const {
        data: { user: data },
      } = await client.patch("/users/me/password", {
        current: currentPassword,
        new_password: newPassword,
        confirm: confirmNewpassword,
      });
      currentPassword = "";
      newPassword = "";
      confirmNewpassword = "";
      updatePass = false;
      user.update((v) => ({
        ...v,
        ...exclude(data, ["_id", "created_at, updated_at", "password"]),
        timestamps: {
          created_at: data.created_at,
          updated_at: data.updated_at,
        },
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async function updateInformations() {
    try {
      const {
        data: { user: d },
      } = await client.patch("/users/me", { email, username });
      user.update((v) => ({
        ...v,
        username: d.username,
        email: d.email,
        timestamps: {
          created_at: d.created_at,
          updated_at: d.updated_at,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style>
  :global(.space-col > div) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<Row class="flex-1 justify-between flex-wrap" gap>
  <Col md="6" col="12" class="my-2">
    <Card class="h-full">
      <div slot="title">Votre profil</div>
      <div slot="subtitle">Ici, modifiez votre profil</div>
      <img slot="content" class="mx-auto" src="./images/settings.svg" alt="" />
    </Card>
  </Col>
  <Col md="6" col="12" class="my-2">
    <Card class="h-full">
      <div slot="title">Mes informations</div>
      <div slot="subtitle">&nbsp;</div>
      <div slot="content" class="text-center">
        {#if loading}
          loading
        {:else}
          <div>
            <Label label="Nom d'utilisateur" />
            <Input disabled value={$user.username} />
            <Label label="Adresse mail" />
            <Input disabled value={$user.email} />
            <Label label="Rôle" />
            <Input disabled value={$user.role} />
            <Label label="Cree le" />
            <Input disabled value={$user.timestamps.created_at} />
            <Label label="Mis a jour le" />
            <Input disabled value={$user.timestamps.updated_at} />
          </div>
        {/if}
        <Button class="mt-10" on:click={() => (updateInfos = true)}>
          Modifier mes informations
        </Button>
        <Button class="mt-10" on:click={() => (updatePass = true)}>
          Modifier mon mot de passe
        </Button>
      </div>
    </Card>
  </Col>

  <Historic />

  <Drafts />

  <Musics />

  <Favourites />

  <Col md="6" col="12" class="my-2">
    <Card class="h-full">
      <div slot="title">Export</div>
      <div slot="subtitle">Exporter mes donnees</div>
      <div slot="content">
        <div>Exporter ces donnees sous un format JSON</div>
        <div>
          Ces donnees contiennent vos informations, votre historique et vos
          brouillons
        </div>
      </div>
      <div slot="actions">
        <Button on:click={exportData}>Exporter</Button>
      </div>
    </Card>
  </Col>
  <Col md="6" col="12" class="my-2">
    <Card class="h-full">
      <div slot="title">Supprimer son compte</div>
      <div slot="subtitle">Cette action est irréversible</div>
      <div slot="actions">
        <Button on:click={() => (confirmationDelete = true)} theme="danger">
          Supprimer mon compte
        </Button>
      </div>
    </Card>
  </Col>
</Row>

<Modal bind:show={confirmationDelete}>
  <Card>
    <div slot="title">Etes-vous sur de vouloir supprimer votre compte ?</div>
    <div slot="subtitle">Impossible de revenir en arriere</div>
    <div slot="actions">
      <Button theme="danger" on:click={deleteAccount}>
        Oui, je veux supprimer mon compte
      </Button>
      <Button on:click={() => (confirmationDelete = false)}>Annuler</Button>
    </div>
  </Card>
</Modal>

<Modal bind:show={updatePass}>
  <Card>
    <div slot="title">Modifier mon mot de passe</div>
    <form slot="content">
      <Label label="Mot de passe actuel" />
      <Input type="password" bind:value={currentPassword} />
      <Label label="Nouveau mot de passe" />
      <Input type="password" bind:value={newPassword} />
      <Label label="Confirmer le mot de passe" />
      <Input type="password" bind:value={confirmNewpassword} />
    </form>
    <div slot="actions" class="space-x-4">
      <Button on:click={saveNewPassword}>Sauvegarder</Button>
      <Button on:click={() => (updatePass = false)}>Annuler</Button>
    </div>
  </Card>
</Modal>

<Modal bind:show={updateInfos}>
  <Card>
    <div slot="title">Modifier mon nom d'utilisateur ou adresse mail</div>
    <form slot="content">
      <Label label="Nom d'utilisateur" />
      <Input bind:value={username} />
      <Label label="Addresse mail" />
      <Input type="email" bind:value={email} />
    </form>
    <div slot="actions" class="space-x-4">
      <Button on:click={updateInformations}>Sauvegarder</Button>
      <Button on:click={() => (updateInfos = false)}>Annuler</Button>
    </div>
  </Card>
</Modal>
