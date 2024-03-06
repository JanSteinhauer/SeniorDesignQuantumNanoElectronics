// In public/service-worker.js
self.addEventListener('fetch', function(event) {
    if (event.request.url.includes('https://cd5c-209-166-123-126.ngrok-free.app')) {
      const modifiedHeaders = new Headers(event.request.headers);
      modifiedHeaders.append('ngrok-skip-browser-warning', 'true');
      // Or modifiedHeaders.append('User-Agent', 'MyCustomAgent');
  
      const newRequest = new Request(event.request, { headers: modifiedHeaders });
      event.respondWith(fetch(newRequest));
    }
  });
  