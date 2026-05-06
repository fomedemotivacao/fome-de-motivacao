import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Facebook Pixel initialization
(() => {
  const PIXEL_ID = "1460767461849584";
  if (typeof window !== "undefined" && !(window as { fbq?: unknown }).fbq) {
    const fbq = (...args: unknown[]) => {
      if ((window as { fbq?: typeof fbq }).fbq) {
        (window as { fbq: typeof fbq }).fbq.call((window as { fbq: typeof fbq }).fbq, ...args);
      } else {
        (window as { fbq: typeof fbq }).fbq = fbq as typeof fbq;
        fbq.callMethod ? fbq.callMethod(fbq, ...args) : fbq.queue.push(args);
      }
    };
    (window as { fbq: typeof fbq; _fbq?: { queue?: unknown[] } })._fbq = { queue: [] };
    (window as { fbq: typeof fbq }).fbq = fbq;
    fbq.callMethod = fbq;
    fbq.queue = [];
    fbq.version = "2.0";
    fbq.push = fbq;
    fbq.loaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
