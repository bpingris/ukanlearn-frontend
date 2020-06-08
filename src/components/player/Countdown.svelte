<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Portal from "svelte-portal";
  let countdown = 3;
  let dispatch = createEventDispatcher();
  let interval = null;

  onMount(() => {
    interval = setInterval(() => {
      countdown -= 1;
      if (countdown === 0) {
        clearInterval(interval);
        dispatch("over");
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<style>
  #countdown {
    background: rgba(0, 0, 0, 0.6);
  }
</style>

<Portal target={document.body}>
  <div
    transition:fade={{duration: 150}}
    class="absolute top-0 left-0 w-full h-full flex items-center justify-center
    z-50 text-6xl text-white"
    id="countdown">
    {countdown}
  </div>
</Portal>
