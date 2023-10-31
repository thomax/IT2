# Refaktorisering og design av neste oppgave

## Mål med økta

- _Refaktorisere_ kode for å gjøre den enklere å teste
- Utforske alternative implementasjoner av et program


## Refaktorisering

Finn minst én funksjon tili Valgomat/MatchMetrics-prosjektet som egner seg for testing. Skriv den om slik at den:

- Den får alt den alt trenger som inn-parametere
- Den bruker bare _lokale_ (dvs ingen _globale_) variable, og returnerer ett svar.
- Når du endrer _signaturen_ til en funksjon, må du også endre på koden som skaller funksjonen.
- Exportér den fra utils.js, importér og bruk den fra App.svelte
- Skriv noen tester som sjekker at den funker som den skal
    

## Designe neste oppgave

Vi finner ut sammen hva neste oppgave går ut på. Vi jobber i random grupper på 2 og 2. Hver gruppe kommer med utkaset i form av en PowerPoint:

- Tema: Vi kan gjøre akkurat hva vi vil, her er noen sjangere: fantasy, krim, steampunk, mafia, sci-fi, post-apokalyptisk, mordmysterie på Vika, annet?
- Foreslå minst 2 temaer
- For hvert tema dere foreslår at kan funke:
  - Foreslå hvordan suksess avgjøres i spillet (poeng? penger? å overleve? minst mulig fravær?)
  - Foreslå minst 4 locations (steder) som spilleren kan besøke, og hva som er på den location, inkludert wireframes
  - Foreslå stats (strength, charisma, hp, luck, penger, karma, inventory, hvem vet?) som character sheet skal inneholde
  - Andre features? High-score liste? Noe multiplayer-aktig?
  - Kan vi bruke AI til å generere locations?
- Presentasjon: Gruppa viser PPT på slutten av timen
