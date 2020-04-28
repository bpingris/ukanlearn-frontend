<script>
  import { Col, Row } from "UI";
  import MusicItem from "./MusicItem.svelte";
  export let musics = null;
</script>

<div class="mt-10">
  {#if musics}
    <Row>
      {#each musics.data as music}
        <Col sm="6" md="4" lg="3" class="mx-2">
          <MusicItem {music} />
        </Col>
      {/each}
    </Row>
  {:else}
    <Row class="justify-center">
      <Col
        md="6"
        class="text-3xl border border-gray-400 rounded-lg py-2 font-light
        text-center">
        Cherchez une musique
      </Col>
    </Row>
  {/if}
</div>
