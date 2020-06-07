<script>
  import { onMount, onDestroy } from "svelte";
  import { toasts } from "store/toasts";
  import ChordEditor from "../editor/Chord.svelte";
  import { Button, Row, Col } from "@UI";
  import { instrument } from "utils/format";
  import Progress from "./Progress.svelte";
  import ChordProgress from "./ChordProgress.svelte";
  /*music = {
    chords: [{name: "Em", strings: [1,2,3]}],
    instrument: "ukulele",
    name: "music name",
    author: "author name",
    id: "qwdhijoqw0812ijqd",
    draft: true|false,
  }*/
  export let music;

  // data
  let playing = false;
  let intervalID = null;
  let currentChord = 0;
  let time = 1000;

  $: hasNextChord = currentChord + 1 < music.chords.length;
  $: finished = currentChord === music.chords.length;

  // methods
  function stop() {
    playing = false;
    clearInterval(intervalID);
  }

  function start() {
    if (finished) currentChord = 0;
    playing = true;
    intervalID = setInterval(() => {
      if (hasNextChord) {
        currentChord += 1;
      } else {
        stop();
        currentChord += 1;
        toasts.add("Session terminee.");
        playing = false;
        // currentChord = 0;
      }
    }, time);
  }

  function reset() {
    currentChord = 0;
  }

  function resume() {
    start();
  }

  // hooks
  onDestroy(stop);
</script>

<div class="p-5 bg-white rounded shadow-md mt-5">
  <div class="flex justify-between">
    <div class="text-4xl font-thin">"{music.name}"</div>
  </div>
  <div class="text-lg">{instrument(music.instrument)}</div>
  <Row class="items-center h-56">
    {#if finished}
      <Col col="12" class="text-3xl items-center justify-center flex flex-col">
        <div>Musique terminee !</div>
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
      <!-- <input type="range" bind:value={time} min={500} max={2000} /> -->
      <Button on:click={start}>Jouer</Button>
      {#if currentChord > 0}
        <Button on:click={reset}>Recommencer</Button>
        {#if !finished}
          <Button on:click={resume}>Reprendre</Button>
        {/if}
      {/if}
    {/if}
  </div>
</div>
