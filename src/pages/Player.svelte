<script>
  import { onMount } from "svelte";
  import { toasts } from "store/toasts";
  import { client } from "api/http";
  import { Loading } from "@UI";
  import Player from "../components/player/Player.svelte";
  import ChordEditor from "../components/editor/Chord.svelte";

  export let currentRoute;
  export let params;
  params;

  const Status = Object.freeze({
    FETCHING_MUSIC: 0,
    FETCHING_CHORDS: 1,
    ERROR_MUSIC: 2,
    ERROR_CHORDS: 3,
    OK: 4
  });

  // data
  const id = currentRoute.namedParams.id;
  let music = null;
  let loading = false;
  let status = Status.FETCHING_CHORDS;
  let chords = null;
  let musicPlayer = {
    chords: [],
    instrument: "",
    name: "",
    id: "",
    draft: false
  };

  // methods
  async function fetchMusic() {
    try {
      const { data } = await client.get(`/musics/id/${id}`);
      console.log({ data });
      music = data.music;
      loadChords();
    } catch (error) {
      console.log({ error });
      status = Status.ERROR_MUSIC;
    }
  }

  async function loadChords() {
    status = Status.FETCHING_MUSIC;
    const _chords = new Set(music.chords);
    for (const c of _chords) {
      try {
        const { data } = await client.post("/chords/details", {
          name: c,
          instrument: music.instrument
        });
        chords = chords
          ? { ...chords, [c]: data.chord.strings }
          : { [c]: data.chord.strings };
      } catch (error) {
        status = Status.ERROR_CHORDS;
        toasts.warning("Impossible de recuperer les accords");
      }
    }
    console.log(chords);
    status = Status.OK;
  }

  // computed
  $: {
    if (music && chords) {
      musicPlayer = {
        instrument: music.instrument,
        id: music._id,
        name: music.name,
        draft: music.draft,
        chords: music.chords.map(o => ({ name: o, strings: chords[o] }))
      };
    }
  }

  // hooks
  onMount(() => {
    if (!id || id.length === 0) {
      return toasts.warning(
        "Musique invalide<br/>Cette musique n'existe plus."
      );
    }
    fetchMusic();
  });
</script>

{#if loading}
  <Loading />
{/if}

{#if status === Status.FETCHING_MUSIC}
  Recuperation de la musique en cours...
{:else if status === Status.FETCHING_CHORDS}
  Recuperation des accords en cours...
{:else if status === Status.OK}
  <Player music={musicPlayer} />
{:else if status === Status.ERROR_MUSIC}
  Erreur lors de la recuperation de la musique
{:else if status === Status.ERROR_CHORDS}
  Erreur lors de la recuperation des accords
{/if}
