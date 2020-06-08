<script>
  import { onMount } from "svelte";
  import { Col, Card, Button, Modal, Loading } from "@UI";
  import { toasts } from "store/toasts";
  import { user } from "store/user";
  import { client } from "api/http";
  import { date, instrument } from "utils/format";

  let loading = false;
  let musics = null;
  let show = false;

  async function fetchHistoric() {
    loading = true;
    try {
      const { data } = await client.get("/users/me/historic");
      musics = data.musics;
    } catch (error) {
      toasts.warning(
        "Impossible de recuperer votre historique de musiques",
        5000
      );
    }
    loading = false;
  }

  let playedTimes = {};

  $: {
    if (Array.isArray($user.historic)) {
      playedTimes = {};
      for (const music of $user.historic) {
        playedTimes[music] = playedTimes[music] ? playedTimes[music] + 1 : 1;
      }
    }
  }

  onMount(fetchHistoric);
</script>

<Col md="6" col="12" class="my-2">
  <Card class="h-full">
    <div slot="title">Mon historique</div>
    <div slot="subtitle">Les musiques jouées</div>
    <div slot="content">
      {#if loading}
        <Loading />
      {:else if musics}
        <div class="flex justify-center">
          <span class="text-center p-3 border border-gray-500 rounded-l">
            {musics.length} musiques jouées !
          </span>
          <button
            on:click={() => (show = true)}
            class="py-3 px-4 cursor-pointer bg-blue-500 rounded-r
            hover:bg-blue-600 text-white">
            Voir
          </button>
        </div>
      {:else}
        <span>Vous n'avez toujours pas joué une musique !</span>
      {/if}
    </div>
  </Card>
</Col>

<Modal bind:show>
  <Card>
    <div slot="title">Mon historique</div>
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
              <div>Jouée {playedTimes[music._id]} fois</div>
            </div>
            <Button to="/player/{music._id}">Jouer</Button>
          </div>
        {/each}
      {:else}
        <span class="text-center text-lg">Vous n'avez pas d'historique</span>
      {/if}

    </div>
    <div slot="actions">
      <Button on:click={() => (show = false)}>Fermer</Button>
    </div>
  </Card>
</Modal>
