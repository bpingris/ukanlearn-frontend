<script>
  import { navigateTo } from "svelte-router-spa";
  import { user } from "store/user";

  async function logout() {
    await user.logout();
    navigateTo("/login");
  }
</script>

<nav
  class="z-20 px-5 flex bg-white h-16 shadow fixed w-full top-0 left-0
  justify-between items-center">
  <a class="uppercase text-3xl font-thin" href="/">Ukanlearn</a>
  <div class="flex">
    <a
      class="mx-2 hover:bg-gray-200 rounded p-1 transition-color duration-100"
      href="/create">
      Creer
    </a>
    <a
      class="mx-2 hover:bg-gray-200 rounded p-1 transition-color duration-100"
      href="/search">
      Rechercher
    </a>
    <a
      class="mx-2 hover:bg-gray-200 rounded p-1 transition-color duration-100"
      href="/tune">
      Accorder
    </a>
    <a
      class="mx-2 hover:bg-gray-200 rounded p-1 transition-color duration-100"
      href="/profile">
      Mon profil
    </a>
    <button
      class="mx-2 hover:bg-gray-200 rounded p-1 transition-color duration-100"
      on:click={logout}>
      Deconnexion
    </button>
  </div>
</nav>
