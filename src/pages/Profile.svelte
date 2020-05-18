<script>
  import { onMount } from "svelte";
  import { Row, Col, Card, Label, Input, Button } from "@UI";
  import { user } from "store/user";
  import { client } from "api/http";

  let loading = false;
  async function me() {
    loading = true;
    await user.fetchMe();
    loading = false;
  }

  onMount(() => {
    me();
  });

  async function exportData() {
    const o = await client.get('/user/me/export')    
    console.log(o)
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(o.data.data)], {type: 'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', o.data.filename);
    document.body.appendChild(link);
    link.click();
    link.remove()
  }
</script>

<style>
  :global(.space-col > div) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<Row class="flex-1 justify-between items-centerd flex-wrap space-col">
  <Col md="6">
    <Card class="mt-5">
      <div slot="title">Votre profil</div>
      <div slot="subtitle">Ici, modifiez votre profil</div>
      <img slot="content" class="mx-auto" src="./images/settings.svg" alt="" />
    </Card>
  </Col>
  <Col md="6">
    <Card class="mt-5">
      <div slot="title">Mes informations</div>
      <div slot="subtitle">bliblou</div>
      <div slot="content">
        {#if loading}
          loading
        {:else}
          <Label label="Nom d'utilisateur" />
          <Input disabled value={$user.username} />
          <Label label="Adresse mail" />
          <Input disabled value={$user.email} />
          <Label label="Role" />
          <Input disabled value={$user.role} />
          <Label label="Cree le" />
          <Input disabled value={$user.timestamps.createdAt} />
          <Label label="Mis a jour le" />
          <Input disabled value={$user.timestamps.updatedAt} />
        {/if}
      </div>
    </Card>
  </Col>

  <Col md="6">
    <Card class="mt-5">
      <div slot="title">Mon historique</div>
      <div slot="subtitle">Les musiques jouees</div>
      <div slot="content">VIDE</div>
    </Card>
  </Col>

  <Col md="6">
    <Card class="mt-5">
      <div slot="title">Mes brouillons</div>
      <div slot="subtitle">Les creations en cours</div>
      <div slot="content">VIDE</div>
    </Card>
  </Col>

  <Col md="6">
    <Card class="mt-5">
      <div slot="title">Mes musiques creees</div>
      <div slot="subtitle">Les musiques creees</div>
    </Card>

  </Col>

  <Col md="6">
    <Card class="mt-5">
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
  <Col md="6">
    <Card class="mt-5">
      <div slot="title">Supprimer son compte</div>
      <div slot="actions">
        <Button theme="danger">Supprimer son compte</Button>
      </div>
    </Card>
  </Col>
</Row>
