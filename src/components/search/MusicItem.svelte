<script>
  import { Card, Button } from "@UI";
  export let music;
</script>

<Card class="relative" thumbnail={music.thumbnail} thumbnailHeight="125">
  <div class="relative z-10" slot="title">{music.name}</div>
  <div class="relative z-10" slot="subtitle">{music.author}</div>
  <div slot="actions">
    <Button>Go</Button>
  </div>
</Card>
