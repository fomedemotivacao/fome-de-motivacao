import { useEffect } from "react";

const FACEBOOK_PIXEL_ID = "1460767461849584";

declare global {
  interface Window {
    _fbq?: { queue?: unknown[] };
    fbq: (
      action: string,
      ...args: unknown[]
    ) => void;
  }
}

export function FacebookPixel() {
  useEffect(() => {
    // Initialize fbq if not already present
    if (window.fbq) return;

    const fbq: typeof window.fbq = (...args) => {
      if (window.fbq) {
        window.fbq.call(window.fbq, ...args);
      } else {
        window.fbq = fbq;
        window.fbq.callMethod ? window.fbq.callMethod(window.fbq, ...args) : window.fbq.queue.push(args);
      }
    };

    window._fbq = window._fbq || {};
    window.fbq = fbq;
    window.fbq.callMethod = fbq;
    window.fbq.queue = [];
    window.fbq.version = "2.0";
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;

    // Load the Facebook Pixel script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    // Initialize and track PageView
    window.fbq("init", FACEBOOK_PIXEL_ID);
    window.fbq("track", "PageView");

    // Add noscript fallback
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.src = `https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }, []);

  return null;
}
