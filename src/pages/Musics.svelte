<script>
  import { onMount } from "svelte";
  import { client } from "api/http";
  import { toasts } from "store/toasts";

  import { Card, Col, Row, Button, Loading, Modal } from "@UI";
  import { instrument, date } from "utils/format";
  import HeartFavourite from "../components/HeartFavourite.svelte";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let musics = null;
  let loading = false;
  let show = false;
  let selected = null;

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

<Card class="mt-5">
  <div slot="title">Mes musiques</div>
  <div slot="subtitle">Retrouvez les musiques que vous avez creees ici</div>
  <div slot="content">
    {#if loading}
      <Loading />
    {:else if musics}
      <Row>
        {#each musics as music}
          <Col col="12" md="6">
            <div
              class="mx-4 my-4 flex flex-col border-t-4 border-gray-500 rounded
              shadow-lg p-8">
              <div class="text-3xl font-thin">{music.name}</div>
              <div class="text-xl">{instrument(music.instrument)}</div>
              <div class="text-xl">Cree le:{date(music.created_at)}</div>
              <div class="text-xl">Mis a jour le:{date(music.updated_at)}</div>
              <div class="mt-4 flex space-x-4 justify-between">
                <HeartFavourite musicID={music._id} />
                <div>
                  <Button to="/player/{music._id}">Jouer</Button>
                  <Button
                    theme="danger"
                    on:click={() => {
                      selected = music;
                      show = true;
                    }}>
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        {/each}
      </Row>
    {:else}
      <div class="text-center">Vous n'avez pas de musiques</div>
      <Button to="/editor">Creer une musique</Button>
    {/if}
  </div>
</Card>

<Modal bind:show>
  <Card>
    <div slot="title">Etes vous sur de vouloir supprimer {selected.name} ?</div>
    <div slot="subtitle">Impossible d'annuler cela</div>
    <div slot="actions">
      <Button
        theme="danger"
        on:click={() => {
          deleteMusic(selected);
          show = false;
        }}>
        Oui
      </Button>
      <Button on:click={() => (show = false)}>Annuler</Button>
    </div>
  </Card>
</Modal>
