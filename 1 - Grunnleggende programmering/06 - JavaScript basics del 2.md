# 06 - JavaScript basics del 2

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

Hvis du ikke allerede har en mappe som heter `1 - Grunnleggende programmering`, lag en slik. Deretter lager du en fil oppi den mappa som heter `06 - JavaScript basics del 2.html`. Start med følgende kode i den fila:

Oppgavene blir gradvis vanskeligere fra 1-6. Fra oppgave 7 og utover finner du noen flere enkle oppgaver der du får trent på funksjoner.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>06 - JavaScript basics del 2</title>
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
    <h1>06 - JavaScript basics del 2</h1>

    <div class="task">
      <h2>Oppgave 1</h2>
      <p>[Forklar hva som foregår her]</p>
      <script>
        // her er løsningen
      </script>
      <pre></pre>
    </div>

    <!-- oppgave 2 osv -->

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

1. Skriv en funksjon som gjør `console.log("Hello inspector")`. Kall funksjonen.
2. Skriv en funksjon som tar et parameter `secretMessage`. Funksjnen gjør `console.log("The secret is: ", secretMessag)`. Kall funksjonen med et parameter som gir mening.
3. Deklarer en global variabel `warningMessage = "This is a warning"`. Skriv en funksjon som tar en parameter "secretMessage". Funksjonen gjør `console.log(warningMessage, "The secret is: ", secretMessag)`. Kall funksjonen med et parameter som gir mening.
4. Lag en ny versjon av den forrige funksjonen. Istedet for å gjøre `console.log` inni funksjonen, returnerer funksjonen string-en resultatet `console.log`-es der hvor du kaller funksjonen.
5. Skriv en funksjon som tar et objekt som parameter. Objektet ser slik ut: `{name: "Thomas Drevon", nickname: "thomax"}` (eller noe annet som passer for deg). Funksjonen oppdaterer nickname-verdien, men nicknamet skal være:

- bare lowercase
- bytte ut alle mellomrom ` ` med underscore `_`
  Funksjonen returnerer det endrete objektet. Skriv resultatet av funksjonskallet med `console.log`.

6. Lag en ny versjon av den forrige funksjonen. Men du har to inputfelt der brukeren kan gi innhold til name og nickname. Når brukeren trykker på en submit-knapp, kalles funksjonen og resultatet vises på siden i html (f.eks. i en `<div>`).
7. Skriv en funksjon `calculateArea(radius)` som tar et tall som parameter. Funksjonen kalkulerer og returnerer arealet av en sirkel. Kall funksjonen og bruk console.log som ouput.
8. Skriv en funksjon `today()`. Funksjonen returnerer navnet på ukedagen. Tips: Bruk `new Date()` og [getDay](https://www.w3schools.com/jsref/jsref_getday.asp). Kall funksjonen og bruk console.log som skriver ut `Det er [UKEDAG] idag`.
9. Skriv en funksjon `randomNumber(min, max)` som tar to tall som parametere og returnerer et tilfeldig tall f.o.m. `min` t.o.m. `max`. Kall funksjonen og bruk console.log som ouput. Prøv å gjøre denne uten chatbot, men ved å slå opp hvordan `Math.random` funker 🤖

