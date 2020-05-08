<script>
  import { Select } from "@UI";
  import { editor } from "store/editor";
  import ChordEditor from "./Chord.svelte";
  export let chords;
  let className = "";
  export { className as class };

  $: items = [
    {
      value: "",
      text: "Tous"
    },
    {
      value: "ukulele",
      text: "Ukulele"
    },
    {
      value: "guitar",
      text: "Guitare"
    }
  ];
  let instrument = "";
  let filteredChords = [];
  // ugly
  $: {
    if (!chords) filteredChords = [];
    else {
      if (instrument === "") {
        filteredChords = chords;
      } else {
        filteredChords = chords.filter(o => o.instrument === instrument);
      }
    }
  }

  function addChord(chord) {
    editor.addChord(chord);
  }

  $: classes = `relative w-1/3 flex flex-col items-center bg-white rounded-xl shadow-lg ${className}`;
</script>

<div class={classes}>
  <Select {items} bind:value={instrument}>
    <div slot="trigger">Trier par instrument</div>
  </Select>

  {#if chords}
    {#each filteredChords as chord}
      <div
        on:click={() => addChord(chord)}
        class="p-5 hover:shadow-xl cursor-pointer transition duration-100">
        <div class="font-thin text-2xl">{chord.name}</div>
        <div class="text-gray-700">{chord.instrument}</div>
        <ChordEditor
          points={chord.strings}
          instrument={chord.instrument}
          readOnly />
      </div>
    {/each}
  {/if}
</div>
