<script>
  import { flip } from "svelte/animate";
  import { Input, Col, Row, Label, Select } from "@UI";
  import ChordEditor from "./Chord.svelte";
  import { user } from "store/user";
  import { editor } from "store/editor";

  let musicName = "";

  $: items = [
    {
      value: "ukulele",
      text: "Ukulele",
    },
    {
      value: "guitar",
      text: "Guitare",
    },
  ];

  function removeChord(i) {
    editor.removeChord(i);
  }
</script>

<div class="w-2/3 bg-white rounded shadow-xl px-3 py-1">
  <Row gap>
    <Col col="4">
      <Label label="Nom de la musique *" />
      <Input class="mb-4" bind:value={$editor.musicName} />
    </Col>
    <Col col="4">
      <Label label="Auteur" />
      <div class="font-thin text-xl">{$user.username}</div>
    </Col>
    <Col col="4">
      <Label label="Instrument" />
      <Select {items} bind:value={$editor.instrument} />
    </Col>
  </Row>
  <hr />
  <Row class="flex-wrap">
    {#each $editor.chords as c, i}
      <Col
        col="12"
        sm="12"
        md="4"
        on:click={() => removeChord(i)}
        class="cursor-pointer hover:shadow-xl transition-shadow duration-100
        my-2">
        <ChordEditor points={c.strings} instrument={c.instrument} readOnly />
        <div class="text-2xl font-bold">{c.name}</div>
      </Col>
    {/each}
  </Row>
</div>
