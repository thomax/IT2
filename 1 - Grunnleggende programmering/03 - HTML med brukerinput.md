# 03 - HTML med brukerinput

## Har du delt mappa di med Thomas?
- [ ] Lag en IT2-mappe. Høyreklikk -> Del -> Alle med lenken, kan vise (ikke redigere). Kopier linken og send den på Teams til Thomas.

## `<input>`
Idag skal vi utforske hvilke ulike typer input-elementer vi kan bruke i HTML. Hva menes med input? Det er når brukeren gi en respons til nettsiden, f.eks. trykke på en knapp, velge fra en nedtrekksmeny eller skrive inn tekst.

## Oppgaver

Hvis du ikke allerede har en mappe som heter `1 - Grunnleggende programmering`, lag en slik. Deretter lager du en fil oppi den som heter `03 - Input.html`. I denne fila skal vi utforske ulike typer input. Her kan du lese mer om [form elements](https://www.w3schools.com/html/html_form_elements.asp). For hver av de nummererte oppgavene under lager du en følgende blokk:

```html
<div>
  <h2>Oppgave 1</h2>
  <!-- din løsning på oppgave 1 -->
  <p>[Din forklaring på hvordan dette funker]</p>
</div>
```

🧨 Det er svært god Universell Utformingspraksis å bruke `<label>` før hver input.

1. Lag et felt der brukeren kan oppgi navnet sitt på én linje med tekst.
2. Lag et felt der brukeren kan oppgi en litt lenger tekst, f.eks. bio. Feltet skal ha plass til `60` characters på én linje, og være `6` linjer høyt.
3. Lag en input der brukeren kan oppgi alderen sin ved å dra i en slider og oppgi et tall mellom `12` og `100`. Default-verdi er `18`.
4. Lag en input der brukeren kan oppgi hvilken måned hen er født i. Velg selv om du vil løse dette med en dropdown (aka "rullgardinmeny") eller med radio-buttons.
5. Lag en rekke med checkboxer der brukeren kan huke av for favoritt-tilbehør på taco. Minimum 8 ulike ingredienser. Pynt alternativene med emojis, om du er i det humøret 🥳
6. Pakk alle disse input-elementene (oppgave 1-5) inn i et `<form>`-element og inkludér en `<button>` som sender alt det brukeren har oppgitt til `/submit.html`
7. Legg på litt CSS, slik at siden blir okay enkelt å lese innholdet, f.eks. ved å bruke `<hr>` eller sette border/background-color på `div`-blokkene. 
8. Se om du greier å bruke `<fieldset>` til noe fornuftig i dette skjemaet 🧐
9. På feltet der brukeren skal skrive inn navnet sitt, legg på attributtene `onfocus` og `onblur` slik at brukeren blir behagelig oppmerksom på hvor fokus er akkurat nå.
10. Lag et felt der brukeren kan oppgi mobilnummeret sitt. Bruk JavaScript til å sjekke om nummeret er et gyldig norsk telefonnummer (dvs. 8 siffer).
11. Lag en knapp som flytter seg litt vekk fra musepekern når brukeren peker på den 😹
12. All done 🤙
