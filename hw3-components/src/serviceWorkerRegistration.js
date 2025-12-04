export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('[SW] Service Worker registered successfully:', registration.scope);
          
          setInterval(() => {
            registration.update();
          }, 60000);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[SW] New content available; please refresh.');
                } else {
                  console.log('[SW] Content cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error);
        });
    });
  } else {
    console.log('[SW] Service Worker is not supported in this browser.');
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[SW] Service Worker unregistered');
      })
      .catch((error) => {
        console.error('[SW] Error unregistering Service Worker:', error.message);
      });
  }
}
