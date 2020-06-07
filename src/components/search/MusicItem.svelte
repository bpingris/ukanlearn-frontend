<script>
  import { onMount } from "svelte";
  import { Card, Button } from "@UI";
  import { client } from "api/http";
  import { toasts } from "store/toasts";
  import { user } from "store/user";
  export let music;
  import HearthFavourite from "../../components/HearthFavourite.svelte";

  $: instrument = music.instrument === "ukulele" ? "Ukulele" : "Guitare";
</script>

<Card class="relative" thumbnail={music.thumbnail} thumbnailHeight="125">
  <div class="relative z-10 flex justify-between" slot="title">
    <div>{music.name}</div>
    <HearthFavourite musicID={music._id} size={8} />
  </div>
  <div class="relative z-10" slot="subtitle">
    {instrument} |
    <span class="italic">@{music.user[0].username}</span>
  </div>
  <div slot="actions">
    <Button to="/player/{music._id}">Go</Button>
  </div>
</Card>
