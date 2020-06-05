<script>
  import { navigateTo } from "svelte-router-spa";
  import { user } from "store/user";
  async function logout() {
    await user.logout();
    navigateTo("/login");
  }

  let open = false;

  const entries = [
    { to: "/create", text: "Créer" },
    { to: "/search", text: "Rechercher" },
    { to: "/tune", text: "Accorder" },
    { to: "/profile", text: "Mon profil" },
    { onClick: logout, text: "Déconnexion" }
  ];
</script>

<style>
  #menu-toggle:checked + #menu {
    display: flex;
  }
</style>

<label
  for="menu-toggle"
  class="cursor-pointer p-2 border border-gray-500 rounded md:hidden block">
  <svg
    class="fill-current h-3 w-3"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
</label>

<input class="hidden" type="checkbox" id="menu-toggle" />
<!-- md:mr-4 block md:inline-block hover:bg-gray-200 rounded p-1  -->
<div
  class="w-full hidden md:items-center md:flex-row flex-col md:w-auto md:flex"
  id="menu">
  {#each entries as entry}
    {#if entry.to}
      <a
        class="block md:inline-block p-2 mr-4 hover:bg-gray-200 transition-color duration-100"
        href={entry.to}>
        {entry.text}
      </a>
    {:else if entry.onClick}
      <button
        class="text-left block md:inline-block p-2 mr-4 hover:bg-gray-200 transition-color duration-100"
        on:click={entry.onClick}>
        {entry.text}
      </button>
    {/if}
  {/each}
</div>
