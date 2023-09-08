# 05 - JavaScript basics

## Har du delt mappa di med Thomas?
- [ ] Lag en IT2-mappe. Høyreklikk -> Del -> Alle med lenken, kan vise (ikke redigere). Kopier linken og send den på Teams til Thomas.

## The Basics
Målet de neste ukene er å beherske grunnleggende JavaScript. For å komme dit må du beherske følgende:
- Kunne definere og bruke variable med `let` og `const`
- Bruke kontrollstrukturene `if`, `for` og `while`  
- Bruke arrays
- Bruke objects
- Bruke funksjoner
  - Med og uten parametere
  - Med og uten return
- Skrive JS-kode i `<script>`-element som brukes i HTML
- Skrive JS-kode i en egen `.js`-fil som du kan kjøre fra terminalen (f.eks. slik `node kode-jeg-har-skrevet.js`)


## Oppgaver

Hvis du ikke allerede har en mappe som heter `1 - Grunnleggende programmering`, lag en slik. Deretter lager du en fil oppi den mappa som heter `05 - JavaScript basics.html`. Start med følgende kode i den fila:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>05 - JavaScript basics</title>
  <style>
    .task {
      margin: 10px;
      padding: 10px;
      background-color: antiquewhite;
      border: 2px solid gray;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>05 - JavaScript basics</h1>

  <div class="task">
    <h2>Oppgave 1</h2>
    <p>[Forklar hva som foregår her]</p>
    <script>
      const pi = 3.14
      console.log('1: pi', pi)
    </script>
    <pre></pre>
  </div>

  <div class="task">
    <h2>Oppgave 2</h2>
    <p>[Forklar hva som foregår her]</p>
    <script>
      let number = 3
      console.log('2: number', number)
      number = number / 2
      console.log('2: half number', number)
    </script>
    <pre></pre>
  </div>

  <script>
    const divs = document.querySelectorAll('div.task')
    divs.forEach((div) => {
      const sourceScript = div.querySelector('script')
      const targetPre = div.querySelector('pre')
      targetPre.textContent = sourceScript.textContent
    })
  </script>

</body>
</html>
```

0. Åpne den fila i nettleseren. Oppgave 1 og 2 er allerede løst! Helt gratis!
1. Definér en variabel, som du tilordner verdien 3.14
2. Definer en variabel med en vilkårlig tallverdi. Overskriv verdien ved å halvere variabelens verdi.
3. Definer to variable, en med fornavnet ditt, og en med etternavnet. Lag en tredje variabel som slår sammen på formatet "etternavn, fornavn". Skriv ut med `console.log()`.
4. Lag et inputfelt som sjekker kontinuerlig (oninput) om brukeren har skrevet det magiske ordet (du bestemmer hva dette er). Når ordet er skrevet, bruk alert() til å si ifra at brukeren vant!
5. Samme som i oppgaven over, men
  - Input-feltet skal ha en placeholder-tekst
  - For å vinne trengs ikke en eksakt match, bare at teksten brukeren skriver _inneholder_ det magiske ordet
  - Teksten brukeren skriver kan godt være i feil casing (upper/lower)
6. Lag et inputfelt som kontinuerlig (oninput) tar imot det brukeren skriver og samtidig (realtime) skriver ut i en `<div>` den speilvendte verdien av det brukeren taster. Dersom den speilvendte teksten inneholder det magiske ordet, gjør bakgrunnen i `<div>`-en grønn.
