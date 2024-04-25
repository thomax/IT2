<script>
  // @ts-nocheck
  import { Monster } from './lib/Monster.js'
  let monsters = []

  function handleNewMonster() {
    const aMonster = new Monster('dwarf')
    monsters.push(aMonster)
    monsters = monsters
  }
</script>

<main>
  <h1>Monster generator</h1>
  <button on:click={handleNewMonster}>New monster</button>
  {#each monsters as monster}
    <div class="monsterBox">
      Name: {monster.name} HP: {monster.hp} Description: {monster.description()}
    </div>
  {/each}
</main>

<style>
  .monsterBox {
    border: 1px solid gray;
    margin: 15px;
    font-size: 1.8rem;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
