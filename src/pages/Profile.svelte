<script>
  import { onMount } from "svelte";
  import { Card } from "UI";
  import { client } from "api/http";

  let userInfo = null;
  function me() {
    userInfo = client.get("/user/me");
  }

  onMount(() => {
    me();
  });
</script>

<Card>
  <div slot="title">Mes informations</div>
  <div slot="subtitle">bliblou</div>
  <div slot="content">
    {#await userInfo}
      loading
    {:then data}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    {/await}
  </div>
</Card>
