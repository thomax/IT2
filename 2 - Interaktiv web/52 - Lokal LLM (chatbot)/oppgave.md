# Hvordan sette opp en chatbot på din egen maksin

1. Last ned og staller Ollama: https://ollama.com/
   a. Hvorfor heter dette "Ollama"??
2. Åpne ledetekst/cmd, og skriv ollama run tinyllama
3. Booom! Du har din egen chatbot!!

Funker? Vi skal nå kjøre Ollama som en server:

Lukk cmd-vindet, åpne et nytt. Skriv inn følgende, en linje av gangen.

NB: Du må også åpne et nytt cmd-vindu før du kaller `ollama serve`

## Windows 10

```
set OLLAMA_ORIGINS=*
set OLLAMA_HOST=127.0.0.1:11434
ollama serve
```

## Windows 11 (Powershell)

```
setx OLLAMA_ORIGINS *
setx OLLAMA_HOST 127.0.0.1:11434
ollama serve
```

Etter å ha gjort dette, må du åpne

Bruke Ollama-APIet, her finner du dokumentasjon: https://github.com/ollama/ollama/blob/main/docs/api.md

Koden under burde hjelpe deg i å komme i gang med API-et. Lag din egen KI-chat. Lykke til!

```js
const apiUrl = 'http://127.0.0.1:11434/api/generate'

function createPrompt(message) {
  const requestData = {
    model: 'tinyllama', // must exist on the server (your computer)
    stream: false,
    prompt: message
  }

  const requestOptions = {
    method: 'POST', // request method (GET, POST, PUT, DELETE, etc.)
    headers: {
      'Content-Type': 'application/json' // type of content in request body
    },
    body: JSON.stringify(requestData), // convert requestData to JSON-format
    signal: controller.signal
  }
  fetch(apiUrl, requestOptions)
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() // convert response to JSON-format
    })
    .then((result) => {
      console.log(result) // this is the actual result
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}
```
