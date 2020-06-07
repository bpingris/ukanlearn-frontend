<script>
  import { onMount } from "svelte";
  import { Col, Card, Modal, Button, Loading } from "@UI";
  import { toasts } from "store/toasts";
  import { client } from "api/http";
  import { date, instrument } from "utils/format";

  let musics = null;
  let loading = false;
  let show = false;

  async function fetchMusics() {
    try {
      const { data } = await client.get("/musics/user/me");
      musics = data.musics;
    } catch (error) {
      toasts.warning("Impossible de recuperer vos musiques");
    }
  }

  async function deleteMusic(music) {
    try {
      await client.delete(`/musics/user/me/${music._id}`);
      fetchMusics();
    } catch (error) {
      toasts.warning("Impossible de supprimer cette musique");
    }
  }

  onMount(fetchMusics);
</script>

<Col md="6" col="12" class="my-2">
  <Card class="h-full">
    <div slot="title">Mes musiques creees</div>
    <div slot="subtitle">Les musiques creees et en ligne</div>
    <div slot="content">
      {#if loading}
        <Loading />
      {:else if musics}
        <div class="flex justify-center">
          <span class="text-center p-3 border border-gray-500 rounded-l">
            {musics.length} musique(s) !
          </span>
          <button
            on:click={() => (show = true)}
            class="py-3 px-4 cursor-pointer bg-blue-500 rounded-r text-white">
            Voir
          </button>
        </div>
      {:else}
        <span>Pas de musiques creees !</span>
      {/if}
    </div>
  </Card>
</Col>

<Modal bind:show>
  <Card>
    <div slot="title">Mes musiques creees</div>
    <div slot="content">
      {#if musics && musics.length > 0}
        {#each musics as music}
          <div
            class="px-5 py-4 mb-4 border-t-8 border-gray-600 shadow-lg
            hover:shadow-xl transition-shadow duration-100 flex items-center
            justify-between space-x-4">
            <div>
              <div class="text-xl">{music.name}</div>
              <div>{instrument(music.instrument)}</div>
              <div>Cree le: {date(music.created_at)}</div>
              <div>Mis a jour: {date(music.updated_at)}</div>
            </div>
            <div class="flex flex-col space-y-2">
              <Button to="/player/{music._id}">Jouer</Button>
              <Button theme="danger" on:click={() => deleteMusic(music)}>
                Supprimer
              </Button>
            </div>
          </div>
        {/each}
      {:else}
        <span class="text-center text-lg">Vous n'avez pas de creations</span>
      {/if}

    </div>
    <div slot="actions">
      <Button on:click={() => (show = false)}>Fermer</Button>
    </div>
  </Card>
</Modal>
