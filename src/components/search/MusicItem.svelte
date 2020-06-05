<script>
  import { Card, Button } from "@UI";
  export let music;

  $: instrument = music.instrument === "ukulele" ? "Ukulele" : "Guitare";
</script>

<Card class="relative" thumbnail={music.thumbnail} thumbnailHeight="125">
  <div class="relative z-10" slot="title">{music.name}</div>
  <div class="relative z-10" slot="subtitle">{instrument} | <span class="italic">@{music.user[0].username}</span></div>
  <div slot="actions">
    <Button>Go</Button>
  </div>
</Card>
