<script>
  import { onMount } from "svelte";
  import { toasts } from "store/toasts";
  import { user } from "store/user";
  import { client } from "api/http";
  import { Modal, Card, Col, Loading, Button } from "@UI";
  import { instrument } from "utils/format";


  let loading = false;
  let show = false;

  $: favourites = $user.favourites

  async function fetchFav() {
    loading = true;
    const error = await user.fetchFavourites();
    if (error) {
      toasts.warning("Impossible de recuperer vos musiques favorites");
    }
    loading = false
  }

  async function deleteFav(favourite) {
    try {
      await client.delete(`/favourites/${favourite._id}`);
      fetchFav();
    } catch (error) {
      toasts.warning("Impossible de supprimer cette musique de vos favoris");
    }
  }

  onMount(fetchFav);
</script>

<Col md="6" col="12" class="my-2">
  <Card class="h-full">
    <div slot="title">Mes favoris</div>
    <div slot="subtitle">Les musiques favorites</div>
    <div slot="content">
      {#if loading}
        <Loading />
      {:else if favourites}
        <div class="flex justify-center">
          <span class="text-center p-3 border border-gray-500 rounded-l">
            {favourites.length} musiques favorites !
          </span>
          <button
            on:click={() => (show = true)}
            class="py-3 px-4 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-r text-white">
            Voir
          </button>
        </div>
      {:else}
        <span>Pas de favoris !</span>
      {/if}
    </div>
  </Card>
</Col>

<Modal bind:show>
  <Card>
    <div slot="title">Mes musiques favorites</div>
    <div slot="content">
      {#if favourites && favourites.length > 0}
        {#each favourites as favourite}
          <div
            class="px-5 py-4 mb-4 border-t-8 border-gray-600 shadow-lg
            hover:shadow-xl transition-shadow duration-100 flex items-center
            justify-between space-x-4">
            <div>
              <div class="text-xl">{favourite.name}</div>
              <div>{instrument(favourite.instrument)}</div>
            </div>
            <div class="flex flex-col space-y-2">
              <Button to="/player/{favourite._id}">Jouer</Button>
              <Button theme="danger" on:click={() => deleteFav(favourite)}>
                Supprimer
              </Button>
            </div>
          </div>
        {/each}
      {:else}
        <span class="text-center text-lg">
          Vous n'avez pas de musiques favorites
        </span>
      {/if}

    </div>
    <div slot="actions">
      <Button on:click={() => (show = false)}>Fermer</Button>
    </div>
  </Card>
</Modal>
