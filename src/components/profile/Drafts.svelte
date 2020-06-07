<script>
  import { onMount } from "svelte";
  import { toasts } from "store/toasts";
  import { Modal, Button, Col, Card, Loading } from "@UI";
  import { client } from "api/http";
  import { date, instrument } from "utils/format";

  // data
  let loading = false;
  let drafts = null;
  let show = false;

  // methods

  async function loadDrafts() {
    try {
      const { data } = await client.get("/users/me/drafts");
      drafts = data.drafts;
    } catch (error) {
      toasts.warning("Impossible de recuperer vos brouillons");
    }
  }

  async function deleteDraft(draft) {
    try {
      await client.delete(`/users/me/drafts/${draft._id}`);
      toasts.success("Votre brouillon a ete supprime");
      loadDrafts();
    } catch (error) {
      toasts.warning("Impossible de supprimer votre brouillons");
    }
  }

  // hooks
  onMount(loadDrafts);
</script>

<Col md="6" col="12" class="my-2">
  <Card class="h-full">
    <div slot="title">Mes brouillons</div>
    <div slot="subtitle">Les creations en cours</div>
    <div slot="content">
      {#if loading}
        <Loading />
      {:else if drafts}
        <div class="flex justify-center">
          <span class="text-center p-3 border border-gray-500 rounded-l">
            {drafts.length} brouillons !
          </span>
          <button
            on:click={() => (show = true)}
            class="py-3 px-4 cursor-pointer bg-blue-500 rounded-r text-white">
            Voir
          </button>
        </div>
      {:else}
        <span>Pas de brouillons !</span>
      {/if}
    </div>
  </Card>
</Col>

<Modal bind:show>
  <Card>
    <div slot="title">Mes brouillons</div>
    <div slot="content">
      {#if drafts && drafts.length > 0}
        {#each drafts as draft}
          <div
            class="px-5 py-4 mb-4 border-t-8 border-gray-600 shadow-lg
            hover:shadow-xl transition-shadow duration-100 flex items-center
            justify-between space-x-4">
            <div>
              <div class="text-xl">{draft.name}</div>
              <div>{instrument(draft.instrument)}</div>
              <div>Cree le: {date(draft.created_at)}</div>
              <div>Mis a jour: {date(draft.updated_at)}</div>
            </div>
            <div class="flex flex-col space-y-2">
              <Button>Editer</Button>
              <Button theme="danger" on:click={() => deleteDraft(draft)}>
                Supprimer
              </Button>
            </div>
          </div>
        {/each}
      {:else}
        <span class="text-center text-lg">Vous n'avez pas de brouillons</span>
      {/if}

    </div>
    <div slot="actions">
      <Button on:click={() => (show = false)}>Fermer</Button>
    </div>
  </Card>
</Modal>
