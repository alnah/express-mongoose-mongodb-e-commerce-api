# Differences Between Cookies and Local Storage for JWTs

**Cookies:**

- Cookies are handled automatically by the browser, simplifying frontend code since no special handling is needed for each request.
- HTTP-only cookies are more secure as they can't be accessed by JavaScript, reducing the risk of XSS attacks.
- Cookies have a size limit of around 4KB, so they are best for minimal data storage like JWTs.
- Cookies work well for same-site requests but can be complex for cross-site scenarios. Using the `SameSite` attribute can control cookie behavior for cross-site requests.
- Cookies can be secured with the `Secure` flag to ensure they are only sent over HTTPS.

**Local Storage:**

- Local storage requires manual handling of tokens in JavaScript, adding complexity to the code.
- Tokens stored in local storage are more vulnerable to XSS attacks, so strong content security policies are necessary.
- Local storage offers more capacity compared to cookies, making it suitable for larger data sets.
- Local storage is useful for single-page applications where the frontend and backend are on different domains. CORS policies need to be implemented for secure cross-domain requests.
- Token expiration and refresh logic must be handled explicitly when using local storage.

**Conclusion:**

For simplicity and security, use cookies when the frontend and backend share the same domain. Use local storage for cross-domain scenarios, ensuring robust security measures. You can set up a proxy with both Next.js and Vite. Here's how to do it for each:

# Next.js Proxy Setup

In Next.js, you can use a custom server with Express and the `http-proxy-middleware` package.

First, install the `http-proxy-middleware` package:

```bash
npm install http-proxy-middleware
```

Then, create a file named `server.js` at the root of your project and set up the proxy:

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Set up the proxy
  server.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
```

Update your `package.json` to use the custom server:

```json
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "next start"
}
```

Run the development server with:

```bash
npm run dev
```

## Vite Proxy Setup

In Vite, you can configure the proxy directly in the `vite.config.js` file.

Create or edit `vite.config.js`:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

Run the development server with:

```bash
npm run dev
```

# `SameSite` Attribute

The `SameSite` attribute helps mitigate CSRF attacks by controlling how cookies are sent with requests:

- `Strict`: Cookies are only sent in a first-party context, ideal for highly sensitive actions.
- `Lax`: Cookies are sent when navigating to the site from external links but not for subresource requests, suitable for session cookies.
- `None`: Cookies are sent in all contexts, necessary for cross-site usage, and should be used with the `Secure` attribute to ensure they are only sent over HTTPS.

By appropriately using the `SameSite` attribute, you can enhance security and control cookie behavior in different contexts.
