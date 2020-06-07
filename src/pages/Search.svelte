<script>
  import { onMount } from "svelte";
  import debounce from "lodash/debounce";
  import { toasts } from "store/toasts";

  import MusicList from "../components/search/MusicList.svelte";
  import { client } from "api/http";
  import { Input, Row, Col, Toast } from "@UI";

  export let currentRoute;
  export let params;
  currentRoute;
  params;
  $: console.log({ currentRoute }, { params });

  let musicName = "";
  let musics = null;
  let loading = false;

  async function searchMusic() {
    loading = true;
    try {
      const res = await client.get(`/musics/search/${musicName || ".*"}`);
      musics = res.data.musics;
    } catch (error) {
      if (error.response.status === 404) {
        toasts.warning("Aucunes musiques trouvees");
      }
    }
    loading = false;
  }

  const handleInput = debounce(async (e) => {
    try {
      const r = await client.get(`/musics/${musicName}`);
      console.log({ r });
    } catch (error) {
      // toasts.warning("oops");
    }
  }, 50000000);

  onMount(() => {
    if (currentRoute.queryParams.q) {
      musicName = currentRoute.queryParams.q;
      searchMusic();
    }
  });
</script>

<div class="mt-10">
  <Row class="justify-center">
    <Col md="6">
      <form on:submit|preventDefault={searchMusic} class="text-center">
        <Input
          on:input={handleInput}
          placeholder="Chupee cocoon..."
          class="w-full"
          bind:value={musicName} />
      </form>
    </Col>
  </Row>
  {#if loading}loading...{/if}
  {#if musics}
    <MusicList {musics} />
  {:else}
    <Row class="justify-center">
      <Col
        md="6"
        class="mt-4 text-3xl border border-gray-400 rounded-lg py-2 font-light
        text-center">
        Cherchez une musique
      </Col>
    </Row>
  {/if}
</div>
