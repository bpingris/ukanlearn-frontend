import { createUser } from "store/user";
import { createEditor } from 'store/editor'
import { client } from "api/http";
import App from "./App.svelte";
import { ToastsContainer } from '@UI'

createUser(client);
createEditor(client);

new ToastsContainer({
  target: document.body,
  intro: true
})

const app = new App({
  target: document.body,
});

export default app;
