<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { get } from "svelte/store";
  import { client } from "api/http";
  import { editor } from "store/editor";
  import { toasts } from "store/toasts";
  import { user } from "store/user";
  import { Loading, Card, Button, Row, Col } from "@UI";
  import ChordsList from "../components/editor/ChordsList.svelte";
  import Timeline from "../components/editor/Timeline.svelte";

  export let currentRoute;
  export let params;
  params;
  currentRoute;

  let draftID = null;
  let chords = null;
  let loading = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchChords() {
    loading = true;
    try {
      await sleep(250);
      const { data } = await client.get("/chords");
      chords = data.chords;
    } catch (error) {
      toasts.warning("Impossible de récupérer les accords");
    }
    loading = false;
  }

  async function saveDraft() {
    const { error, data } = await editor.saveDraft(draftID);
    console.log({ draftID });

    if (data) {
      draftID = data.music._id;
    }
  }

  onMount(fetchChords);
  onDestroy(editor.reset);
</script>

{#if loading}
  <div transition:fade class="flex min-h-screen items-center justify-center">
    <Row>
      <Col>
        <Card>
          <div slot="content" class="text-center flex flex-col items-center">
            <Loading />
            Récuperation des accords en cours...
            <div />
          </div>
        </Card>
      </Col>
    </Row>
  </div>
{:else}
  <div class="flex space-x-4 my-5">
    <Timeline />
    <ChordsList {chords} />
  </div>
  <div class="fixed bottom-0 left-0 mb-5 ml-5 flex flex-col space-y-4">
    <Button on:click={() => editor.save()}>Sauvegarder</Button>
    <Button on:click={saveDraft}>Sauvegarder comme brouillon</Button>
  </div>
{/if}
