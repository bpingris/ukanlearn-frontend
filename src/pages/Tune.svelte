<script>
  import {onDestroy} from 'svelte'
  import { Microphone } from "utils/audio";
  import Ukulele from "../components/tuner/Ukulele.svelte";
  import Guitar from "../components/tuner/Guitar.svelte";
  import Instrument from "../components/tuner/Instrument.svelte";
  import { Button, Select, Card } from "@UI";
  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let microphone = null;
  let pitch = 0;
  let instrument = "ukulele";
  let items = [
    { text: "Ukulele", value: "ukulele" },
    { text: "Guitare", value: "guitar" }
  ];
  let strings = [];
  $: {
    if (instrument === "ukulele") {
      strings = [
        { string: "G", freq: 392 },
        { string: "C", freq: 261.63 },
        { string: "E", freq: 329.63 },
        { string: "A", freq: 440 }
      ];
    } else {
      strings = [
        { string: "E", freq: 82.41 },
        { string: "A", freq: 110.00  },
        { string: "D", freq: 146.83 },
        { string: "G", freq: 196.00 },
        { string: "B", freq: 246.94 },
        { string: "e", freq: 329.63 }
      ];
    }
  }
  $: title =
    instrument === "ukulele" ? "Accorder son ukulele" : "Accorder sa guitare";
  async function getMicrophoneStream() {
    const audioContext = new AudioContext();
    microphone = new Microphone(
      audioContext,
      data => {
        pitch = data;
      },
      e => {
        if (e instanceof DOMException) {
          alert("pls do something");
        }
      },
      stream => (isMicActive = true)
    );
  }

  function stop() {
    if (microphone) {
      microphone.stop();
      isMicActive = false;
    }
  }
  let isMicActive = false;
  let selected = "";
  onDestroy(stop)
</script>

<div>
  <Card class="my-4">
    <div slot="title">Controles</div>
    <div slot="subtitle">
      Activez le micro puis choisissez l'instrument à accorder
    </div>
    <div
      slot="content"
      class="flex flex-col sm:flex-row items-center space-x-4">
      {#if isMicActive}
        <Button class="w-40" on:click={stop}>Stop</Button>
      {:else}
        <Button class="w-40" on:click={getMicrophoneStream}>
          Activer micro
        </Button>
      {/if}
      <Select
        on:select={() => (selected = '')}
        bind:value={instrument}
        {items} />
    </div>
  </Card>
  <Instrument
    {pitch}
    {isMicActive}
    bind:selectedString={selected}
    {title}
    subtitle="Sélectionnez la corde à accorder"
    {instrument}
    {strings} />
</div>
