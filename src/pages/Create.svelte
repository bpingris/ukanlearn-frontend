<script>
  import { Col, Row, Button, Card } from "@UI";
  import ChordEditor from "../components/editor/Chord.svelte";
</script>

<div class="mt-10">
  <Row class="justify-center space-x-4">
    <Col col="12" md="6">
      <Card>
        <div slot="title">Creer votre musique</div>
        <div slot="subtitle">
          Composez vous meme les musiques que vous aimez
        </div>
        <div slot="content">
          Utilisez l'editeur en ligne Ukanlearn pour creer votre musique a
          l'aide des accords disponibles
        </div>
        <div slot="actions">
          <Button>
            <a href="/editor">Je cree ma musique</a>
          </Button>
        </div>
      </Card>
    </Col>
    <Col col="12" md="6">
      <Card>
        <div slot="title">Parcourez vos musiques</div>
        <div slot="subtitle" />
        <div slot="content">
          Parcourez les musiques que vous avez deja creees, modifiez-les ou
          entrainez-vous avec !
        </div>
        <div slot="actions">
          <Button>Parcourir</Button>
        </div>
      </Card>
    </Col>
  </Row>
</div>
