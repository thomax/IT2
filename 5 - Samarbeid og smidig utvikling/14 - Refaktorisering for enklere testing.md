# Refaktorisering for enklere testing

## Mål med økta

- Utforske alternative implementasjoner av et program
- Refaktorisere kode for å gjøre den enklere å teste

![TDD](./tdd.png)


## Vitest
Hvis du ikke har installert [Vitest](https://vitest.dev) i Valgomat/MatchMetrics-prosjektet ditt, [gå tilbake til forrige økt](./13%20-%20Testing%20av%20kode.md) og gjør det.

1. Finn en funksjon i Valgomat/MatchMetrics-prosjektet - f.eks. `calculateTotalScore()`. Dette må skje i to steg:
  - Sørg for at `calculateTotalScore()`-funksjonen ikke er avhengig av globale variable. Det kan hende du må skrive den om slik:

    - Den får alt den alt trenger som inn-parametere
    - Den tukler ikke med globale variable, men returnerer bare en ferdig kalkulert score. Til slutt ser denne kanskje slik ut:    

```js
function calculateTotaleScore(age, height, etc) {
  let totalScore = 0
  // whatever logic you may have that increases/decreases totalScore based on the parameters
  return totalScore
}
```
    
  - Flytt `calculateTotalScore()`-funksjonen til `utils.js` og eksporter den på samme måte som `sum`-funksjonen. For at ikke `App.svelte` skal knekke nå, må den importere den flyttete funksjonen på samme måte som `utils.test.js` importerer sum.
2. Skriv fire tester som sjekker at `calculateTotalScore()` funker som den skal. Det finnes flere matchers enn `toBe()`, her er [en fin dokumentasjon](https://jestjs.io/docs/using-matchers). 
