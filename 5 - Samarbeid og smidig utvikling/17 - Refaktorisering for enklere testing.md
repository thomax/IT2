# Refaktorisering for enklere testing

## Mål med økta

- Utforske alternative implementasjoner av et program
- _Refaktorisere_ kode for å gjøre den enklere å teste

![TDD](./tdd.png)


## Vitest

Hvis du ikke har installert [Vitest](https://vitest.dev) i Valgomat/MatchMetrics-prosjektet ditt, [gå tilbake til forrige økt](./16%20-%20Testing%20av%20kode.md) og gjør det.

1. Finn en funksjon i Valgomat/MatchMetrics-prosjektet - f.eks. `calculateTotalScore()`. Dette må skje i to steg:
  - Pass for at `calculateTotalScore()`-funksjonen ikke er avhengig av globale variable. Pass på at:

    - Den får alt den alt trenger som inn-parametere
    - Den bruker bare _lokale_ (dvs ingen _globale_) variable, og returnerer en ferdig kalkulert score.
    - Når du endrer _signaturen_ til en funksjon, må du også endre på koden som skaller funksjonen.
    - Til slutt ser den kanskje slik ut:    

```js
      function calculateTotaleScore(age, height, etc) {
        let totalScore = 0
        // whatever logic you may have that increases/decreases 
        // totalScore based on the parameters (age, height etc)
        return totalScore
      }
```
    
  - Flytt `calculateTotalScore()`-funksjonen til `utils.js` og eksporter den på samme måte som `sum`-funksjonen. For at ikke `App.svelte` skal knekke nå, må den importere `calculateTotalScore()`-funksjonen på samme måte som `utils.test.js` importerer `sum()`-funksjonen.

2. Skriv minst fire tester som sjekker at `calculateTotalScore()` funker som den skal. Pass på at du tester edge-caser (f.eks. negative tall som input). Når du skriver tester har du flere matchers enn `toBe()` å velge mellom. Her er [en fin dokumentasjon](https://jestjs.io/docs/using-matchers). 
