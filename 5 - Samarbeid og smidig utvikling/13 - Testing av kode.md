# Testing av kode

## Mål med økta

- Forklare hva TDD er og hvordan det kan gjøre livet som utvikler bedre
- Erfaring med å skrive tester til egen kode

![TDD](./tdd.png)


## Vitest
Det er massevis av biblioteker som kan hjelpe oss med dette, vi skal ta i bruk [Vitest](https://vitest.dev).

Du har sikkert en funksjon du har lyst til å teste, men vi skal først lage en fra scratch.

1. Naviger til Valgomat/MatchMetrics-prosjektet ditt og kjør `npm install --save-dev vitest`
2. I Valgomat/MatchMetrics-prosjektet, lag en ny fil `./src/lib/utils.js`. Lim inn følgende kode:

```js
export const sum = (a, b) => {
    return 'nope'
}
```
3. Vi skal nå skrive en test som sjekker at den funksjonen virker som den skal. For den summerer vel de to tallene `a+b`?
4. Lag en ny mappe på roten av prosjektet som heter `tests`
5. Lag en ny fil i den mappa som heter `utils.test.js` og legg til følgende kode:

```js
import { expect, test } from 'vitest'
import {sum} from '../src/lib/utils.js'

test('adds 1 + 2 to equal 3', () => {
  const result = sum(1, 2)  
  expect(result).toBe(3)
})
```

6. Å nei!! Testen feiler! Funksjonen vår `sum` returnerer en string `"nope"` istedet for number `3`. Your mission, should you choose to accept it: Fix the `sum` function so the test passes.
7. Skriv en ny test i `utils.test.js` som sjekker at 11+999 gir korrekt resultat.
8. Skriv en ny test i `utils.test.js` som sjekker at 50-9 gir korrekt resultat.
9. Okay. Da har vi kontroll på `sum` funksjonen. La os gjøre noe nyttig. Finn en funksjon i Valgomat/MatchMetrics-prosjektet - f.eks. `calculateTotalScore()` som du flytter ut til `utils.js` og eksporter den på samme måte som `sum`-funksjonen. For at ikke `App.svelte` skal knekke nå, må den importere den flyttete funksjonen på samme måte som `utils.test.js` importerer sum.
10. Skriv fire tester som sjekker at `calculateTotalScore()` funker som den skal.
