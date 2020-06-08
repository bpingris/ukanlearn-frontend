<script>
  import { fade } from "svelte/transition";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import Manual from "./Manual.svelte";
  import Automatic from "./Automatic.svelte";
  import { Button, Col, Row, Card } from "@UI";
  export let strings = [
    {
      string: "G",
      freq: 392,
    },
    {
      string: "C",
      freq: 261.63,
    },
    {
      string: "E",
      freq: 329.63,
    },
    {
      string: "A",
      freq: 440,
    },
  ];
  export let selectedString = "";
  export let instrument = "ukulele";
  export let title;
  export let subtitle;
  export let pitch;
  export let isMicActive = false;
</script>

<Card>
  <div slot="title">{title}</div>
  <div slot="subtitle">{subtitle}</div>
  <div slot="content">
    <Tabs>
      <TabList>
        <Tab>Manuel</Tab>
        <Tab>Automatique</Tab>
      </TabList>

      <TabPanel>
        <Manual
          {pitch}
          {isMicActive}
          bind:selectedString
          {title}
          subtitle="Selectionnez la coder a accorder"
          {instrument}
          {strings} />
      </TabPanel>

      <TabPanel>
        <Automatic
          {pitch}
          {isMicActive}
          bind:selectedString
          {title}
          subtitle="Jouer la corde que vous souhaitez accorder"
          {instrument}
          {strings} />
      </TabPanel>
    </Tabs>

  </div>
</Card>
