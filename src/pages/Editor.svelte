<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { navigateTo } from "svelte-router-spa";
  import { get } from "svelte/store";
  import { client } from "api/http";
  import { editor } from "store/editor";
  import { toasts } from "store/toasts";
  import { user } from "store/user";
  import { Loading, Card, Button, Row, Col, Modal } from "@UI";
  import ChordsList from "../components/editor/ChordsList.svelte";
  import Timeline from "../components/editor/Timeline.svelte";

  export let currentRoute;
  export let params;
  params;

  let draftID = null;
  let chords = null;
  let loading = false;
  let show = false;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

    if (data) {
      draftID = data.music._id;
    }
  }

  function getCorrectChords(c, instrument) {
    let tmp = [];
    for (const chord of chords) {
      if (chord.instrument === instrument && c.includes(chord.name)) {
        tmp.push(chord);
      }
    }
    return tmp;
  }

  async function loadExistingMusic() {
    if (!currentRoute.queryParams.id) return;
    try {
      const {
        data: { music },
      } = await client.get(`/musics/id/${currentRoute.queryParams.id}`);
      draftID = music._id
      editor.set({
        musicName: music.name,
        instrument: music.instrument,
        chords: getCorrectChords(music.chords, music.instrument),
      });
    } catch (error) {
      toasts.warning("Impossible de recuperer votre musique");
    }
  }

  async function testIt() {
    show = true;
  }

  async function saveAs(choice) {
    if (choice === "draft") {
      await saveDraft();
      navigateTo(`/player/${draftID}?draft=true`);
    } else {
      const { data, error } = await editor.save();
      if (data) {
        navigateTo(`/player/${data.music._id}?draft=true`);
      }
    }
  }

  onMount(async () => {
    await fetchChords();
    loadExistingMusic();
  });
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
    <Button on:click={testIt}>Tester</Button>
    <Button on:click={() => editor.save()}>Sauvegarder</Button>
    <Button on:click={saveDraft}>Sauvegarder comme brouillon</Button>
  </div>
{/if}

<Modal bind:show>
  <Card>
    <div slot="title">Tester la musique</div>

    <div slot="content">
      <div>Afin de tester la musique, celle-ci doit etre sauvegardee</div>
      <div>
        Voulez-vous sauvegarder la musique comme brouillon ou comme creation ?
      </div>
    </div>
    <div slot="actions" class="flex w-full space-x-4 justify-center">
      <Button on:click={() => saveAs('draft')}>Brouillon</Button>
      <Button on:click={() => saveAs('creation')}>Creation</Button>
    </div>
  </Card>
</Modal>
