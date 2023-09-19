# 09 - Oppgave: MatchMetrics eller Valgomat

## Målet med denne oppgaven

- Ta imot, analysere og presentere data fra ekte brukere
- Kunne levere et oversiktlig prosjekt, der README og ryddig kode kommuniserer tydelig hva som foregår
- Lage en morsom og spennende app, og samtidig ta høyde for hvordan andre mennesker kan oppleve av teknologien

## Absolutte krav
Frist: 03.10.2023
Innleveringen består av to separate ting

`const appName = "MatchMetrics" || "Valgomat"`

1. Selve appen
    - Alt som hører til oppgaven ligger i mappa `2 - Interaktiv web/${appName}/`
    - Appen starter opp når man kjører `npm start`
2. En en fil ved navn `2 - Interaktiv web/${appName}/README.md` som inneholder dokumentasjon av appen og prosessen.

## Kravspesifikasjon

### MatchMetrics
Appen heter MatchMetrics, og samler inn diverse brukerdata. Disse dataene behandles i en algoritme som produserer en poengsum. Denne poengsummen er ment å indikere (på en humoristisk og godlynt måte) hvor bra match brukeren er som kjærste (evt. bestevenn). Dette er subjektivt, men må "gi mening" (mao ikke bare random score).

### Valgomat
Appen heter Valgomat, og samler inn diverse brukerdata, i form av spørsmål om politiske enkeltsaker. Disse dataene behandles i en algoritme som produserer en ranking av hvilke partier brukeren en mest enig med. Objektivitet er viktig.

- Lag en web app med Svelte.js
- Ta i mot ulik input fra brukeren, minst 5 ulike inputs, inkludert:
    - Range
    - Dropdown
    - Radio buttons
    - Check boxes
- Analyser data-ene
    - Algoritmen som analyserer data-ene er tydelig dokumentert
- Presenter resultatet til brukeren
- Appen inneholder info om hvem som står bak
- Prosjektet inneholder en Readme.md (på [markdown-format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)) med:
    - Beskrivelse av appen
    - Viser wireframes som illustrerer layout
    - Designvalg du har gjort underveis
    - Refleksjon rundt hva du mener appen mangler, og hva du ville gjort anderledes dersom du skulle gjøre dette igjen

## Ekstra goodies

- Dele-knapp slik at brukeren lett kan tipse venner om appen
- Deploy på Vercel (eller Netlify eller annen provider) slik at appen er tilgjengelig fra Internett
- En backend som tar i mot og aggregerer anonymiserte data
- En fin nettside som presenterer appen
- Annet?

## Vurderingskriterier

|              | ⭐️       | ⭐️⭐️      | ⭐️⭐️⭐️    |
|--------------|-----------|-----------|-------------|
| Virker appen?  | Nei/omtrent ikke | Stort sett  | Smooth |
| Brukeropplevelse | Det vanskelig å forstå hva appen gjør | Brukeren forstår omtrentlig hva appen gjør | Brukeren opplever full kontroll og forstår hva som foregår til enhver tid |
| Er appen like brukbar på alle skjermstørrelser | Nei/omtrent ikke | Stort sett | Ja - [Responsive bliss](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) |
| Ryddig HTML + CSS | Rotete HTML/CSS-kode som ikke virker, eller tilfeldigvis virker. | HTML/CSS-kode er lesbar og brukbart funksjonell.  | HTML/CSS-kode er svært enkel å lese, minimalistisk og funksjonell |
| Ryddig JS | Rotete JS-kode som ikke virker, eller tilfeldigvis virker | Stort sett forståelig JS-kode som vil virke i de fleste tilfeller | Lesbar kode som virker og ikke er lenger enn nødvendig |
| Dokumentasjon  | Prosjektet har lite/utilstrekkelig dokumentasjon | README og gjør delvis rede for prosjektet og koden er delvis dokumentert | README gjør tydelig rede for prosjektet og koden er enten kommentert eller selvdokumenterende |
| Arkitektur  | Navn på funksjoner og variable er inkonsekvente og/eller kryptiske | Navn på funksjoner og variable er noenlunde konsekvente og forståelige | Navn på funksjoner og variable er beskrivende og følger konsekvent gode navnekonvensjoner |
| Filer  | Det er rotete i mapper, filer og filnavn som hører til prosjektet | OK orden i mapper, filer og filnavn som hører til prosjektet | Svært god orden i mapper, filer og filnavn som hører til prosjektet |
