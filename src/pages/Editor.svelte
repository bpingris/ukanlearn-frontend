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

  let chords = null;
  let loading = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchChords() {
    loading = true;
    try {
      //   await sleep(1000);
      const { data } = await client.get("/chords");
      chords = data.chords;
    } catch (error) {
      toasts.warning("Impossible de récupérer les accords");
    }
    loading = false;
  }

  async function save() {
    const $editor = get(editor);
    const $user = get(user);
    try {
      await client.post("/musics", {
        name: $editor.musicName,
        chords: $editor.chords.map(o => o.name),
        author: $user.username,
        instrument: $editor.instrument
      });
      toasts.success("Musique sauvegardée avec succés");
    } catch (error) {
      toasts.error("Une erreur est survenue");
    }
  }

  let draftSave = null;
  async function autoSaveDraft() {
    console.log(draftSave);
    if ($editor.chords.length == 0 && $editor.musicName.length <= 5) return;
    try {
      const r = await client.put("/users/me/drafts", {
        id: draftSave ? draftSave._id : null,
        name: $editor.musicName,
        chords: $editor.chords.map(o => o.name),
        instrument: $editor.instrument
      });
      draftSave = r.data.music;
      toasts.success(
        "Votre musique a ete sauvegarde dans vos brouillons",
        5000
      );
    } catch (error) {
      toasts.warning(
        "Une erreur est survenue lors de la sauvegarde du brouillon"
      );
      console.log(error);
    }
  }

  let intervalID = null;
  onMount(() => {
    fetchChords();
    intervalID = setInterval(autoSaveDraft, 10000);
  });
  onDestroy(() => {
    clearInterval(intervalID);
  });
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
  <Button class="fixed bottom-0 left-0 mb-5 ml-20" on:click={save}>
    Sauvegarder
  </Button>
{/if}
