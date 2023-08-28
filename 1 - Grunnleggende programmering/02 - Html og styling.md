# 02 - HTML og styling

## Del mappa di med Thomas
- [ ] Lag en IT2-mappe. Høyreklikk -> Del -> Alle med lenken, kan vise (ikke redigere). Kopier linken og send den på Teams til Thomas.

## Oppgaver

1. Gå inn i OneNote klassenotatblokka og les gjennom det som ligger i _Innholdsbibliotek
	- 1, 2 og 3 er altså temaene for dette faget mens 4 og 5 pågår oppå/parallelt med at vi jobber med 1, 2 eller 3
2. Ta en titt på denne koden
```html
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
  <link href="styles.css" rel="stylesheet" type="text/css" />
  <title>ufisk.no</title>
</head>
<boady>
  <div id="main">
    <h1>ufisk.no</h1>
    <div id="menu">
      <ul id="menu_list">
        <li><a href="home.html">Home</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="apps.html">Apps</a></li>
        <li><a href="support,html">Support</a></li>
      </li>
    </div>
    <img src="banner.jpg" />
    <div id="content">
      <h2>Home</h2>
      <p>Home of ufisk on the Internet. ATM, ufisk is working on <a href="superapp.html">an insanely super app</p>
    </div>
  </div>
</body>
</html>
```

3. Tegn en wireframe som illustrerer hvordan du mener dette vil sånn cirka se ut når det rendres i nettleseren.
4. Koden inneholder noen bugs, og noen best-practice feil. Hvilke klarer du å få øye på?
5. Lim koden inn i ChatGPT eller en annen chatbot, og be den hjelpe deg med å finne feil i koden. Fant den noen feil du ikke hadde sett?
6. Opprett mappa `1 - Grunnleggende programmering` og lag en fil oppi der som heter `02 - Superduo.html`. I denne fila skal du:

	1. Lag en webside som viser superduobildet vi lagde i forrige økt, i full bredde. Men sørg for at bildet ikke er høyere enn skjermens høyde. Du skal kunne se hele bildet i størst mulig format.
	2. Sett margin 10px på bildet.
	3. Lag runde hjørner på bildet, med 5px radius
	4. Flytt CSS-koden ut i en egen fil, som du inkluderer via en `<link>` tag i `<head>`
	5. All done 🤙
