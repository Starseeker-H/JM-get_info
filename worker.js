addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  const specialCases = {
    "*": {
      "Origin": "DELETE",
      "Referer": "DELETE"
    }
  }
  function handleSpecialCases(request) {
    const url = new URL(request.url);
    const rules = specialCases[url.hostname] || specialCases["*"];
    for (const [key, value] of Object.entries(rules)) {
      switch (value) {
        case "KEEP":
          break;
        case "DELETE":
          request.headers.delete(key);
          break;
        default:
          request.headers.set(key, value);
          break;
      }
    }
  }
  async function handleRequest(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Please enter the link after the /")
    };
    const actualUrlStr = url.pathname.replace("/", "") + url.search + url.hash;
    const actualUrl = new URL(actualUrlStr);
    const modifiedRequest = new Request(actualUrl, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });
    handleSpecialCases(modifiedRequest);
    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    return modifiedResponse;
  }