<script>
  import { user } from "store/user";
  import { toasts } from "store/toasts";
  import { client } from "api/http";
  export let musicID;
  export let size = 10;

  let isFav = false;

  $: {
    $user.favourite;
    isFav = user.isFavourite(musicID);
  }

  $: title = isFav ? "Enlever des favoris" : "Ajouter aux favoris";

  async function handleClick() {
    try {
      if (isFav) {
        await client.delete(`/favourites/${musicID}`);
      } else {
        await client.post("/favourites", {
          music_id: musicID,
        });
      }
      user.fetchFavourites();
    } catch (error) {
      console.log(error);

      toasts.warning(
        `Impossible ${isFav ? "d'enlever des" : "d'ajouter aux"} favoris`
      );
    }
  }
</script>

<span on:click={handleClick} class="cursor-pointer" {title}>
  {#if isFav}
    <svg
      class="text-red-700 hover:text-red-500 h-{size} w-{size}"
      fill="currentColor"
      viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656
        5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clip-rule="evenodd" />
    </svg>
  {:else}
    <svg
      class="text-gray-700 hover:text-black h-{size} w-{size}"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0
        00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  {/if}
</span>
