<script>
  import Progress from "./Progress.svelte";

  export let time;
</script>

<Progress height="h-8" duration={time} current={100} />
