<script>
  import { fade } from "svelte/transition";
  import { Row, Col, Button } from "@UI";

  export let strings = [
    {
      string: "G",
      freq: 392,
    },
    {
      string: "C",
      freq: 261.63,
    },
    {
      string: "E",
      freq: 329.63,
    },
    {
      string: "A",
      freq: 440,
    },
  ];
  export let selectedString = "";
  export let instrument = "ukulele";
  export let pitch;
  export let isMicActive = false;
  let isStringTuned = false;

  $: formatedPitch = pitch.toFixed(0);
  $: {
    const tmp = strings.find((o) => o.string === selectedString);

    isStringTuned = tmp ? isInRange(tmp.freq, 10, formatedPitch) : false;
  }
  /**
   * @param {number} n
   * @param {number} p
   * @param {number} t
   * @returns {boolean}
   */
  function isInRange(n, p, t) {
    if (!n) return false;
    const tmp = (n * p) / 100;
    if (t >= n - tmp && t <= n + tmp) {
      return true;
    }
    return false;
  }

  function closest() {
    if (pitch === -1) return;
    let curr = strings[0];
    let diff = Math.abs(pitch - curr.freq);
    for (const c of strings) {
      let newdiff = Math.abs(pitch - c.freq);
      if (newdiff < diff) {
        diff = newdiff;
        curr = c;
      }
    }
    selectedString = curr.string;
  }

  $: {
    pitch;
    closest();
  }
</script>

<Row class="justify-center mt-5">
  <img
    class="w-64"
    transition:fade={{ duration: 100 }}
    src="./images/{instrument}.svg"
    alt="" />
  {#each [selectedString] as string (string)}
    <img
      class="w-64 absolute"
      transition:fade={{ duration: 100 }}
      src="./images/{instrument}_{string}.svg"
      alt="" />
  {/each}
</Row>
{#if isMicActive}
  <Row class="justify-center">
    {#if formatedPitch == '-1'}
      <span class="font-thin text-2xl">Grattez une corde !</span>
    {:else}
      <span
        class="text-xl font-bold"
        class:text-red-600={!isStringTuned}
        class:text-green-600={isStringTuned}>
        {formatedPitch}
      </span>
    {/if}
  </Row>
{/if}
