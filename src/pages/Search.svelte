<script>
  import MusicList from "../components/search/MusicList.svelte";
  import { client } from "api/http";
  import { Input, Row, Col } from "@UI";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let musicName = "";
  let musics = null;
  function searchMusic() {
    musics = client.get("/music");
  }
</script>

<div class="mt-10">
  <Row class="justify-center">
    <Col md="6">
      <form on:submit|preventDefault={searchMusic} class="text-center">
        <Input
          placeholder="Chupee cocoon..."
          class="w-full"
          bind:value={musicName} />
      </form>
    </Col>
  </Row>
  {#await musics}
    loading...
  {:then data}
    <MusicList musics={data} />
  {:catch error}
    {error}
  {/await}

</div>
