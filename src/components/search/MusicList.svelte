<script>
  import { Col, Row } from "@UI";
  import MusicItem from "./MusicItem.svelte";
  export let musics = null;
</script>

<style>
  :global(.space-col > div) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<div class="mt-10">
  {#if musics}
    {#if musics.data.musics.length === 0}
      <div class="text-center text-xl">
      Aucunes musiques trouvees</div>
    {/if}
    <Row class="flex-wrap space-col">
      {#each musics.data.musics as music}
        <Col col="12" sm="6" md="4" lg="3">
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
