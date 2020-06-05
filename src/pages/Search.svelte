<script>
  import MusicList from "../components/search/MusicList.svelte";
  import { client } from "api/http";
  import { Input, Row, Col, Toast } from "@UI";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let musicName = "";
  let musics = null;
  function searchMusic() {
    musics = client.get("/musics");
  }

  async function d() {
    await client.put("/users/me/draft", {
      author: "bbeqweqwe",
      chords: ["e", "r"],
      name: "hihqweqwewqi",
      instrument: "guitar"
    });
    client.put("/users/me/draft", {
      author: "bbeqweqwe",
      chords: ["e", "r"],
      name: "hihqweqwewqi",
      instrument: "guitar",
      id: "ewq"
    });
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
