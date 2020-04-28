import { createUser } from "store/user";
import { client } from "api/http";
import App from "./App.svelte";

createUser(client);

const app = new App({
  target: document.body,
});

export default app;
