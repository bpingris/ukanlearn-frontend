<script>
  import { onDestroy } from "svelte";
  import { navigateTo } from "svelte-router-spa";
  import { toasts } from "store/toasts";
  import { client } from "api/http";
  import ChordEditor from "../editor/Chord.svelte";
  import { Button, Row, Col } from "@UI";
  import { instrument } from "utils/format";
  import Progress from "./Progress.svelte";
  import ChordProgress from "./ChordProgress.svelte";
  import HeartFavourite from "../HeartFavourite.svelte";
  import Countdown from "./Countdown.svelte";

  /*music = {
    chords: [{name: "Em", strings: [1,2,3]}],
    instrument: "ukulele",
    name: "music name",
    author: "author name",
    id: "qwdhijoqw0812ijqd",
    draft: true|false,
  }*/
  export let music;
  export let isDraft = false;

  // data
  let playing = false;
  let intervalID = null;
  let currentChord = 0;
  let time = 1000;
  let countdown = false;

  $: hasNextChord = currentChord + 1 < music.chords.length;
  $: finished = currentChord === music.chords.length;

  // methods
  function stop() {
    playing = false;
    clearInterval(intervalID);
  }

  async function addToHistoric() {
    try {
      await client.post(`/users/me/historic/${music.id}`);
    } catch (error) {
      toasts.warning("Impossible d'ajouter cette session à votre historique");
    }
  }

  function start() {
    if (finished) currentChord = 0;
    playing = true;
    countdown = false;
    intervalID = setInterval(() => {
      if (hasNextChord) {
        currentChord += 1;
      } else {
        stop();
        currentChord += 1;
        toasts.primary("Session terminee.", 5000);
        playing = false;
        addToHistoric();
      }
    }, time);
  }

  function reset() {
    currentChord = 0;
  }

  function resume() {
    start();
  }

  function goBackToEditor() {
    navigateTo(`/editor?id=${music.id}`);
  }

  function startCountdown() {
    countdown = true;
  }

  async function deleteDraft() {
    try {
      await client.delete(`/users/me/drafts/${music.id}`);
      toasts.success("Votre brouillon a été supprimé");
      navigateTo("/profile");
    } catch (error) {
      toasts.warning("Impossible de supprimer votre brouillon");
    }
  }

  // hooks
  onDestroy(stop);
</script>

{#if countdown}
  <Countdown on:over={start} />
{/if}

{#if isDraft}
  <div
    on:click={goBackToEditor}
    class="inline-block rounded bg-white mt-4 p-4 shadow cursor-pointer
    hover:shadow-xl transition-shadow duration-150">
    <div class="flex items-center">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0
          011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010
          1.414z"
          clip-rule="evenodd" />
      </svg>
      <span class="ml-2">Retour à l'éditeur</span>
    </div>
  </div>
  <div
    on:click={deleteDraft}
    class="inline-block rounded bg-white mt-4 p-4 shadow cursor-pointer
    hover:shadow-xl transition duration-150 hover:bg-red-500 hover:text-white">
    <div class="flex items-center">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0
          002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012
          0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd" />
      </svg>
      <span class="ml-2">Supprimer</span>
    </div>
  </div>
{:else}
  <div
    on:click={goBackToEditor}
    class="inline-block rounded bg-white mt-4 p-4 shadow cursor-pointer
    hover:shadow-xl transition-shadow duration-100">
    <div class="flex items-center">
      <svg fill="currentColor" viewBox="0 0 20 20" class="h-8 w-8">
        <path
          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0
          000-2.828z" />
        <path
          fill-rule="evenodd"
          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2
          2H4a2 2 0 01-2-2V6z"
          clip-rule="evenodd" />
      </svg>
      <span class="ml-2">Ouvrir dans l'éditeur</span>
    </div>
  </div>
{/if}
<div class="p-5 bg-white rounded shadow-md mt-5">
  <div class="flex justify-between">
    <div class="text-4xl font-thin">"{music.name}"</div>
    <HeartFavourite musicID={music.id} />
  </div>
  <div class="text-lg">{instrument(music.instrument)}</div>
  <Row class="items-center h-56">
    {#if finished}
      <Col col="12" class="text-3xl items-center justify-center flex flex-col">
        <div>Musique terminée !</div>
        <div>Vous pouvez rejouer la musique si vous le souhaitez</div>
      </Col>
    {:else}
      <Col col="6" class="flex justify-center">
        {#if currentChord < music.chords.length}
          <ChordEditor
            readOnly
            points={music.chords[currentChord].strings}
            instrument={music.instrument} />
        {/if}
      </Col>
      <Col col="4" class="flex justify-center flex-col items-center">
        {#if hasNextChord}
          <div class="text-xl">Prochain accord:</div>
          <ChordEditor
            class="transform scale-75"
            readOnly
            points={music.chords[currentChord + 1].strings}
            instrument={music.instrument} />
        {/if}
        {#if playing}
          {#each [currentChord] as c (c)}
            <ChordProgress {time} />
          {/each}
        {/if}
      </Col>
    {/if}
  </Row>
  <div class="mt-5">
    <Progress
      bgColor="bg-gray-400"
      barColor="bg-gray-600"
      current={(currentChord / music.chords.length) * 100} />
  </div>
  <div class="mt-5 flex justify-center items-center space-x-4">
    {#if playing}
      <Button on:click={stop}>Stop</Button>
    {:else}
      <div class="flex flex-col items-center justify-center">
        <button
          class="px-4 py-2 w-full rounded-t bg-blue-300 text-white
          hover:bg-blue-600"
          on:click={() => (time += 100)}>
          +
        </button>
        <div class="px-4 py-2 border">{time}</div>
        <button
          class="px-4 py-2 w-full rounded-b bg-blue-300 text-white
          hover:bg-blue-600"
          on:click={() => (time -= 100)}>
          -
        </button>
      </div>
      <Button on:click={startCountdown}>Jouer</Button>
      {#if currentChord > 0}
        <Button on:click={reset}>Recommencer</Button>
        {#if !finished}
          <Button on:click={resume}>Reprendre</Button>
        {/if}
      {/if}
    {/if}
  </div>
</div>
