<script>
  import { fade } from "svelte/transition";
  import { Button, Col, Row, Card } from "@UI";
  let strings = [
    {
      string: "E",
      freq: 392
    },
    {
      string: "A",
      freq: 261.63
    },
    {
      string: "D",
      freq: 329.63
    },
    {
      string: "G",
      freq: 440
    },
    {
      string: "B",
      freq: 440
    },
    {
      string: "e",
      freq: 440
    }
  ];
  let selectedString = "";
</script>

<Card>
  <div slot="title">Accorder sa guitar ukulele</div>
  <div slot="subtitle">Selectionner la corde a accorder</div>
  <div slot="content">
    <Row class="justify-center items-center">
      {#each strings as string}
        <Col class="text-center" cols="1">
          <Button on:click={() => (selectedString = string.string)}>
            {string.string}
          </Button>
        </Col>
      {/each}
    </Row>
    <Row class="justify-center items-center">
      <Col class="text-center">
        <Button on:click={() => (selectedString = '')}>Aucune</Button>
      </Col>
    </Row>
    <Row class="justify-center mt-10">
      <img
        class="w-64"
        transition:fade={{ duration: 100 }}
        src="./images/guitar.svg"
        alt="" />
      {#each [selectedString] as string (string)}
        <img
          class="w-64 absolute"
          transition:fade={{ duration: 100 }}
          src="./images/guitar_{string}.svg"
          alt="" />
      {/each}
    </Row>
  </div>
</Card>
