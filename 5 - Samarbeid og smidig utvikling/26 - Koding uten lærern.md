# Koding uten lærern

## Mål med økta

- Gjøre ferdig en beta-versjon av din `Location`



## Hvordan push'e kode til github.com

1. Utgangspunktet:
  - Du har kode lokalt (på laptoppen din) som er nyere enn den som er i github
  - Du vet ikke om det finnes nyere kode på github, enn det du har lokalt
  - Du kan når som helst skrive `git status` for å se hvordan det står til med koden din
2. `git stash`
  - Legger "til side" din egen lokale kode
  - Nå har du "nullstilt" den lokale koden din, slik den så ut siden forrige gang du gjorde `git clone` eller `git pull`  
2. `git pull --rebase`
  - Laster ned ("pull-er") den ferskeste koden som ligger på github
3. `git stash pop`
  - Tar fram koden du la til side i punkt 1 og legger den "oppå" den ferske koden du lastet ned
4. Nå har du blandet den ferskeste koden fra github, med dine egne endringer - lokalt (på laptoppen din). Det kan hende du har konflikter, dvs kode som ikke passer sammen.
  - Disse konfliktene må fikses. Dette er et eget kurs.
  - Hvis du ikke fikk noen konflikter, eller når konfliktene er fiksa, gå til neste punkt
5. `git add .`
  - Deklarere hvilken kode du har lyst til at skal til github
6. `git commit -m"My message"`
  - Du beskriver endringene du har gjort
  - Bytt ut `My message`, med f.eks. "Fixed bug in CharacterSheet" eller "Added new component GreenGarden.svelte"
7. `git push`
  - Laster opp ("push-er") koden til github
  - Dersom dette resulterer i en feil, har noen andre rukket å pushe ut ny kode, og du må hente siste versjon av koden som ligger på github. Det du gjør nå, ser cirka slik ut:
    1. `git pull --rebase`
    2. Fiks konflikter, hvis det er noen
    3. `git add .`
    4. `git commit -m"Fix conflicts"`
    5. `git push`


