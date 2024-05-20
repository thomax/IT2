const apiUrl = 'http://127.0.0.1:11434/api/generate'

async function handlePromptInput() {
  const inputText = document.getElementById('inputArea').value
  document.getElementById('displayArea').innerHTML += `<p><span class="who">You:</span> <span class="text">${inputText}</span></p>`
  console.log('Awaiting response...')
  document.getElementById('inputArea').value = ''
  const result = await createPrompt(inputText)
  console.log('Got response:', result)
  document.getElementById('displayArea').innerHTML += `<p><span class="who">Bot:</span> ${result.response}</span></p>`
}

async function createPrompt(message) {

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    return controller.abort()
  }, 18000)

  const requestData = {
    model: 'phi3',
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

  try {
    return fetch(apiUrl, requestOptions).then((res) => res.json())
      .then(data => data)
  } catch (error) {
    console.error(error)
    return { response: error.message }
  } finally {
    clearTimeout(timeoutId)
  }
}
