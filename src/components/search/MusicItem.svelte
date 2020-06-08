<script>
  import { onMount } from "svelte";
  import { Card, Button } from "@UI";
  import { client } from "api/http";
  import { toasts } from "store/toasts";
  import { user } from "store/user";
  export let music;
  import HeartFavourite from "../../components/HeartFavourite.svelte";

$:console.log(music)
  $: instrument = music.instrument === "ukulele" ? "Ukulele" : "Guitare";
</script>

<Card class="relative h-full" thumbnail={music.thumbnail} thumbnailHeight="125">
  <div class="relative z-10 flex justify-between" slot="title">
    <div>{music.name}</div>
    <HeartFavourite musicID={music._id} size={8} />
  </div>
  <div class="relative z-10" slot="subtitle">
    {instrument} |
    <span class="italic">@{music.user[0].username}</span>
  </div>
  <div slot="actions">
    <Button to="/player/{music._id}">Go</Button>
  </div>
</Card>
