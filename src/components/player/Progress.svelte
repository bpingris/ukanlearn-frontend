<script>
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";
  export let current;
  export let duration = 250;
  export let easing = linear;
  export let bgColor = "bg-blue-300";
  export let barColor = "bg-blue-600";
  export let height = "h-12"

  let progress = tweened(0, {
    duration,
    easing
  });

  $: progress.set(current);
</script>

<div class="rounded-lg relative w-full {height} {bgColor}">
  <div
    style="width: {$progress}%"
    class="rounded-lg absolute top-0 left-0 h-full {barColor}" />
</div>
