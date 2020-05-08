<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { get } from "svelte/store";
  import { client } from "api/http";
  import { editor } from "store/editor";
  import { user } from "store/user";
  import { Loading, Card, Button, Row, Col } from "@UI";
  import ChordsList from "../components/editor/ChordsList.svelte";
  import Timeline from "../components/editor/Timeline.svelte";
  export let currentRoute;
  export let params;
  params;
  currentRoute;

  let chords = null;
  let loading = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchChords() {
    loading = true;
    try {
      //   await sleep(1000);
      const { data } = await client.get("/chord");
      chords = data;
    } catch (error) {}
    loading = false;
  }

  async function save() {
    const $editor = get(editor);
    const $user = get(user);
    try {
      await client.post("/music", {
        name: $editor.musicName,
        chords: $editor.chords.map(o => o.name),
        author: $user.username
      });
      alert("Music added");
    } catch (error) {
      console.log(error);
    }
  }

  onMount(fetchChords);
</script>

{#if loading}
  <div transition:fade class="flex min-h-screen items-center justify-center">
    <Row>
      <Col>
        <Card>
          <div slot="content" class="text-center flex flex-col items-center">
            <Loading />
            Recuperation des accords en cours...
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
  <Button class="fixed bottom-0 left-0 mb-5 ml-20" on:click={save}>
    Sauvegarder
  </Button>
{/if}
