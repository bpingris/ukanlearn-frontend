<script>
  import { Col, Row, Button, Card, Form } from "@UI";
  import ChordEditor from "../components/editor/Chord.svelte";
</script>

<!-- <Form /> -->

<div class="mt-10">
  <Row gap class="justify-center">
    <Col col="12" md="6">
      <Card class="h-full">
        <div slot="title">Creer votre musique</div>
        <div slot="subtitle">
          Composez vous même les musiques que vous aimez
        </div>
        <div slot="content">
          Utilisez l'editeur en ligne Ukanlearn pour créer votre musique à
          l'aide des accords disponibles
        </div>
        <div slot="actions">
          <Button to="/editor">Je crée ma musique</Button>
        </div>
      </Card>
    </Col>
    <Col col="12" md="6">
      <Card class="h-full">
        <div slot="title">Parcourez vos musiques</div>
        <div slot="subtitle" />
        <div slot="content">
          Parcourez les musiques que vous avez deja créées, modifiez-les ou
          entrainez-vous avec !
        </div>
        <div slot="actions">
          <Button to="/musics">Parcourir</Button>
        </div>
      </Card>
    </Col>
  </Row>
</div>
