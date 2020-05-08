import { createUser } from "store/user";
import { createEditor } from 'store/editor'
import { client } from "api/http";
import App from "./App.svelte";

createUser(client);
createEditor(client);

const app = new App({
  target: document.body,
});

export default app;
