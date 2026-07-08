# The Web: Everything You Need to Know

> A comprehensive guide to how the World Wide Web works — from the physical cable to the browser rendering a webpage.

---

## Table of Contents

1. [What Is the Web?](#1-what-is-the-web)
2. [How the Web Works (High Level)](#2-how-the-web-works-high-level)
3. [Core Protocols](#3-core-protocols)
4. [DNS — The Phonebook of the Internet](#4-dns--the-phonebook-of-the-internet)
5. [HTTP & HTTPS](#5-http--https)
6. [Webpages — Structure & Rendering](#6-webpages--structure--rendering)
7. [HTML](#7-html)
8. [CSS](#8-css)
9. [JavaScript](#9-javascript)
10. [The DOM](#10-the-dom)
11. [Browser Architecture](#11-browser-architecture)
12. [Web APIs](#12-web-apis)
13. [Web Servers](#13-web-servers)
14. [Databases & the Backend](#14-databases--the-backend)
15. [Web Security](#15-web-security)
16. [Cookies, Sessions & Authentication](#16-cookies-sessions--authentication)
17. [APIs & REST](#17-apis--rest)
18. [Web Performance](#18-web-performance)
19. [Modern Web Development](#19-modern-web-development)
20. [Web Hosting & Deployment](#20-web-hosting--deployment)
21. [The Full Stack at a Glance](#21-the-full-stack-at-a-glance)
22. [Glossary](#22-glossary)

---

## 1. What Is the Web?

The **World Wide Web (WWW)** — commonly called "the web" — is an information system where documents and other web resources are identified by URLs, interlinked by hypertext links, and can be accessed via the internet. It was invented by **Sir Tim Berners-Lee** in 1989 while working at CERN.

**Important distinction:**

| Term | What it is |
|------|------------|
| **Internet** | The global network of interconnected computers. The physical/link infrastructure. |
| **Web** | A service *on top of* the internet. It uses HTTP to transfer documents. |
| **Email, FTP, VoIP** | Other services that also run on the internet. |

> The web is not the internet. The internet is the pipe; the web is what flows through it.

---

## 2. How the Web Works (High Level)

When you type a URL (`https://example.com/page`) into a browser, here's what happens:

```
You type URL
    ↓
Browser parses URL → protocol (https), host (example.com), path (/page)
    ↓
DNS lookup — "What is the IP address of example.com?"
    ↓
Browser opens a TCP connection to that IP (port 443 for HTTPS)
    ↓
TLS handshake (if HTTPS) — establishes encrypted connection
    ↓
Browser sends an HTTP request (GET /page)
    ↓
Server processes the request
    ↓
Server sends back an HTTP response (HTML, JSON, images, etc.)
    ↓
Browser parses the HTML, fetches linked resources (CSS, JS, images)
    ↓
Browser renders the page (paints pixels to screen)
```

**Round-trip time (RTT)** : One request + response cycle. A typical page load involves dozens of RTTs.

---

## 3. Core Protocols

Protocols are the rules that govern how data is exchanged. The web relies on a **protocol stack**:

### TCP/IP — The Foundation

| Layer | Protocols | What it does |
|-------|-----------|-------------|
| **Application** | HTTP, HTTPS, DNS, FTP, SSH | User-facing services |
| **Transport** | TCP, UDP | Reliable (TCP) or fast (UDP) delivery |
| **Internet** | IP (IPv4, IPv6) | Addressing & routing across networks |
| **Link** | Ethernet, Wi-Fi | Physical data transfer on local network |

**TCP (Transmission Control Protocol)** : Connection-oriented, guarantees delivery, ordering, and error-checking. Most web traffic uses TCP.

**UDP (User Datagram Protocol)** : Connectionless, no guarantees. Used for DNS, video streaming, VoIP, gaming.

### The TCP Handshake (3-Way)

```
Client → SYN          → Server
Client ← SYN-ACK      ← Server
Client → ACK          → Server
```

This 3-way handshake adds **one RTT** before any data is sent. This is why HTTP/2 and HTTP/3 optimize connection setup.

### TLS — Transport Layer Security

Encrypts TCP connections. Used by HTTPS (HTTP over TLS).

**TLS Handshake (simplified):**

```
Client Hello (cipher suites, TLS version)
    ↓
Server Hello (picks cipher suite, sends certificate)
    ↓
Client verifies certificate (against trusted CAs)
    ↓
Key exchange (e.g., Diffie-Hellman) → shared secret established
    ↓
Encrypted communication begins
```

> **Certificate Authorities (CAs)** : Trusted entities (Let's Encrypt, DigiCert, etc.) that issue digital certificates to verify a server's identity.

---

## 4. DNS — The Phonebook of the Internet

DNS (Domain Name System) translates human-readable domain names (`google.com`) into machine-readable IP addresses (`142.250.190.46`).

### DNS Lookup Flow

```
Browser → checks local DNS cache
  ↓ (miss)
Browser → asks Recursive Resolver (usually your ISP or 8.8.8.8)
  ↓ (miss)
Resolver → Root Nameserver (.) → tells resolver where to find .com TLD server
Resolver → TLD Nameserver (.com) → tells resolver where to find example.com nameserver
Resolver → Authoritative Nameserver (example.com) → returns IP address
Resolver → caches & returns IP to browser
```

**Record types:**

| Record | Purpose |
|--------|---------|
| A | Maps domain → IPv4 address |
| AAAA | Maps domain → IPv6 address |
| CNAME | Maps domain → another domain (alias) |
| MX | Mail server address |
| TXT | Arbitrary text (SPF, DKIM, verification) |
| NS | Nameserver delegation |

---

## 5. HTTP & HTTPS

**HTTP (Hypertext Transfer Protocol)** is the protocol that web browsers and servers use to communicate.

### HTTP Methods

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| `GET` | Retrieve a resource | Yes | Yes |
| `HEAD` | Same as GET but no body | Yes | Yes |
| `POST` | Submit data / create a resource | No | No |
| `PUT` | Replace a resource entirely | Yes | No |
| `PATCH` | Partially update a resource | No | No |
| `DELETE` | Remove a resource | Yes | No |
| `OPTIONS` | Describe communication options | Yes | Yes |

### HTTP Status Codes

```
1xx — Informational (100 Continue, 101 Switching Protocols)
2xx — Success (200 OK, 201 Created, 204 No Content)
3xx — Redirection (301 Moved Permanently, 302 Found, 304 Not Modified)
4xx — Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests)
5xx — Server Error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)
```

### HTTP Headers

**Request Headers** (sent by client):
- `Host`: Target domain
- `User-Agent`: Browser/client identification
- `Accept`: What content types the client accepts
- `Authorization`: Credentials (e.g., `Bearer <token>`)
- `Cookie`: Stored cookies
- `Referer`: Previous page URL
- `Origin`: Where the request originated (for CORS)
- `Content-Type`: Format of request body

**Response Headers** (sent by server):
- `Content-Type`: Format of response body (`text/html`, `application/json`, etc.)
- `Set-Cookie`: Tell browser to store a cookie
- `Cache-Control`: Caching policy
- `Access-Control-Allow-Origin`: CORS policy
- `Location`: Redirect URL (used with 3xx)
- `Content-Security-Policy`: Security restrictions

### HTTP Versions

| Version | Year | Key Feature |
|---------|------|-------------|
| HTTP/0.9 | 1991 | One-line protocol, GET only |
| HTTP/1.0 | 1996 | Headers, status codes, multiple methods |
| HTTP/1.1 | 1997 | Persistent connections, chunked transfer, caching headers |
| HTTP/2 | 2015 | Multiplexing, server push, header compression (HPACK), binary protocol |
| HTTP/3 | 2022 | Uses QUIC (over UDP instead of TCP), faster connection setup |

### HTTPS = HTTP + TLS

- Encrypts all communication
- Prevents eavesdropping, tampering, MITM attacks
- Verified via TLS certificates
- Required for HTTP/2 (in practice) and HTTP/3

---

## 6. Webpages — Structure & Rendering

A **webpage** is a document written in HTML that can include CSS for styling and JavaScript for interactivity.

### Critical Rendering Path

How the browser turns HTML/CSS/JS into pixels:

```
HTML → Bytes → Tokens → Nodes → DOM Tree
CSS → Bytes → Tokens → Nodes → CSSOM Tree
                                        ↓
                          Render Tree (DOM + CSSOM combined)
                                        ↓
                          Layout (calculates geometry)
                                        ↓
                          Paint (fills pixels)
                                        ↓
                          Composite (layers assembled)
```

**Important concepts:**
- **Render-blocking resources**: CSS and JavaScript (without `async`/`defer`) block rendering
- **Above-the-fold**: Content visible without scrolling — should be loaded first (critical CSS)
- **Layout shift**: When elements move after they've already been painted (annoying users)

---

## 7. HTML

HTML (HyperText Markup Language) is the standard language for creating webpages.

### Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Hello World</h1>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Content goes here.</p>
      <img src="image.jpg" alt="Description" loading="lazy">
    </article>
    <aside>
      <p>Sidebar content</p>
    </aside>
  </main>
  <footer>
    <p>&copy; 2026</p>
  </footer>
  <script src="app.js"></script>
</body>
</html>
```

### Common Element Categories

| Category | Elements |
|----------|----------|
| **Document metadata** | `<html>`, `<head>`, `<title>`, `<meta>`, `<link>` |
| **Sectioning** | `<body>`, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` |
| **Text content** | `<h1>`-`<h6>`, `<p>`, `<ul>`/`<ol>`, `<li>`, `<blockquote>`, `<pre>` |
| **Inline text** | `<a>`, `<strong>`, `<em>`, `<span>`, `<br>`, `<code>` |
| **Multimedia** | `<img>`, `<video>`, `<audio>`, `<source>`, `<canvas>`, `<svg>` |
| **Forms** | `<form>`, `<input>`, `<textarea>`, `<button>`, `<select>`, `<option>`, `<label>` |
| **Tables** | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` |
| **Scripting** | `<script>`, `<noscript>` |

### Semantic HTML

Using elements for their intended meaning (not just for styling) improves:
- **Accessibility** (screen readers)
- **SEO** (search engines)
- **Maintainability**

Bad: `<div class="nav">` → Good: `<nav>`
Bad: `<div class="footer">` → Good: `<footer>`

### Every Interactive HTML Element — The Complete Reference

Every control, button, and input that a user can interact with on a webpage.

#### Buttons

| Element | What It Does |
|---------|-------------|
| `<button type="submit">` | Submits the parent `<form>` — sends form data to the server |
| `<button type="reset">` | Resets all form fields to their initial/default values |
| `<button type="button">` | Does nothing by itself — used with JavaScript for custom actions |
| `<input type="submit">` | Same as `<button type="submit">` — submits the form |
| `<input type="reset">` | Same as `<button type="reset">` — resets the form |
| `<input type="image">` | An image that acts as a submit button — sends click coordinates (`x,y`) |

#### Text Inputs

| Element | What It Does |
|---------|-------------|
| `<input type="text">` | Single-line plain text input |
| `<input type="search">` | Search field — browser may add a clear button (ⓧ), uses `enter` to search |
| `<input type="url">` | URL input — browser validates URL format, mobile keyboards show `.com` key |
| `<input type="email">` | Email input — browser validates email format, mobile keyboards show `@` key |
| `<input type="tel">` | Telephone input — mobile keyboards show numeric keypad, no auto-validation |
| `<input type="password">` | Password input — characters masked as dots/asterisks, prevents shoulder-surfing |
| `<textarea>` | Multi-line text input — resizable (default), rows/cols attributes control size |

#### Numeric Inputs

| Element | What It Does |
|---------|-------------|
| `<input type="number">` | Numeric input — shows up/down arrows (spinner), validates numeric, `min`/`max`/`step` attributes |
| `<input type="range">` | Slider control — returns a number between `min` and `max`, no visible input box |
| `<input type="date">` | Date picker — native calendar widget, format: YYYY-MM-DD |
| `<input type="time">` | Time picker — native clock widget, format: HH:MM |
| `<input type="datetime-local">` | Date + time picker — no timezone info, format: YYYY-MM-DDTHH:MM |
| `<input type="month">` | Month picker — format: YYYY-MM |
| `<input type="week">` | Week picker — format: YYYY-Www |

#### Choice Inputs

| Element | What It Does |
|---------|-------------|
| `<input type="checkbox">` | Checkbox — toggles on/off, multiple can be checked in a group, sent only if checked |
| `<input type="radio">` | Radio button — only one in a group (`name` attribute) can be selected |
| `<select>` | Dropdown list — click to expand options, single selection by default |
| `<select multiple>` | List box — Ctrl/Cmd+click for multi-select, shows several options at once |
| `<datalist>` | Autocomplete suggestions — tied to an `<input>` via `list` attribute, user can type freely |
| `<optgroup>` | Groups `<option>` elements in a `<select>` with a non-selectable heading label |

#### File & Data Inputs

| Element | What It Does |
|---------|-------------|
| `<input type="file">` | File picker — opens OS file dialog, `accept` attribute filters by MIME type |
| `<input type="file" multiple>` | File picker that allows selecting multiple files |
| `<input type="hidden">` | Invisible field — stores data that must be submitted but not shown to user |
| `<input type="color">` | Color picker — native OS color wheel, returns hex value (#RRGGBB) |

#### Specialized Inputs

| Element | What It Does |
|---------|-------------|
| `<input type="week">` | Selects a specific week in a year |
| `<input type="month">` | Selects a specific month in a year |
| `<progress>` | Progress bar — indicates completion percentage (`value`/`max`), indeterminate if no `value` |
| `<meter>` | Gauge — displays a scalar value within a known range (e.g., disk usage), color-coded by thresholds |
| `<details>` | Disclosure widget — collapsible section with a triangle toggle, open by default with `open` attr |
| `<summary>` | Visible heading for `<details>` — clicking it toggles open/closed |
| `<dialog>` | Modal or non-modal dialog box — `.showModal()` opens as modal, `.show()` as non-modal, `Esc` closes |

#### Form Structure Elements

| Element | What It Does |
|---------|-------------|
| `<form>` | Container for input elements — defines the submission target (`action`) and method (`get`/`post`) |
| `<fieldset>` | Groups related form controls — draws a box, provides semantic grouping |
| `<legend>` | Caption for `<fieldset>` — acts as the group's label |
| `<label>` | Associates text with an input — clicking the label focuses the input, improves accessibility |
| `<output>` | Displays result of a calculation — updated by JavaScript, semantically marks output data |

#### Links & Navigation

| Element | What It Does |
|---------|-------------|
| `<a href="url">` | Hyperlink — navigates to URL, `target="_blank"` opens new tab |
| `<a href="#id">` | Anchor link — scrolls to element with matching `id` on the same page |
| `<a href="mailto:email">` | Opens default email client with pre-filled recipient |
| `<a href="tel:number">` | Initiates phone call on mobile devices |
| `<a download>` | Forces download of linked resource instead of navigating to it |
| `<area>` | Defines a clickable region on an image map (used with `<map>`) |
| `<map>` | Defines an image map with clickable `<area>` regions |

#### Media Controls

| Element | What It Does |
|---------|-------------|
| `<video controls>` | Video player — play/pause, volume, fullscreen, seek bar, captions |
| `<video autoplay>` | Starts playing automatically when page loads (blocked by many browsers unless muted) |
| `<audio controls>` | Audio player — play/pause, volume, seek bar |
| `<track>` | Subtitles/captions for `<video>` or `<audio>` — `kind` can be `subtitles`, `captions`, `descriptions` |
| `<canvas>` | Drawable region — rendered with JavaScript (not interactive by itself, but supports click handlers) |
| `<embed>` | Embeds external plugin content (deprecated — use `<video>`, `<audio>`, or `<iframe>`) |

#### Interactive Attributes (Not Elements — But Change Behavior)

| Attribute | On Element | What It Does |
|-----------|-----------|-------------|
| `contenteditable="true"` | Any element | Makes text editable inline (like a rich text editor) |
| `draggable="true"` | Any element | Makes element draggable — works with drag & drop API |
| `spellcheck="true"` | Inputs, textareas | Enables browser spell-checking |
| `autocomplete="on"` | Forms, inputs | Allows browser to autofill saved values |
| `autofocus` | Inputs, buttons | Automatically focuses the element on page load |
| `disabled` | Inputs, buttons | Prevents interaction — element is grayed out and skipped in tab order |
| `readonly` | Inputs, textareas | User can see and select text but cannot edit it |
| `required` | Inputs, selects | Prevents form submission if field is empty — browser shows validation message |
| `pattern` | Inputs | Regex validation — `pattern="[0-9]{3}"` requires exactly 3 digits |
| `multiple` | Inputs, selects | Allows multiple values (files, emails, options) |
| `tabindex` | Any element | Controls tab order — `tabindex="0"` adds to natural order, negative removes from keyboard nav |
| `accesskey` | Any element | Keyboard shortcut — browser-specific modifier + key (e.g., Alt+K) |

#### What Happens When You Click Each Button Type

```
Click "Submit" button
    ↓
Browser: validates all required fields
    ↓ (if validation passes)
Browser: encodes form data as URL-encoded (default) or FormData
    ↓
Browser: sends HTTP request (GET or POST based on form method)
    ↓
Browser: navigates to server response URL (or handles via JS)
```

```
Click "Reset" button
    ↓
Browser: restores every form field to its value in the HTML
         (does NOT clear — resets to initial/default values)
    ↓
No HTTP request is made
```

```
Click "Button" type button (type="button")
    ↓
Nothing happens … unless JavaScript attached an event listener
    ↓
JS fires 'click' event → runs your code
```

#### Form Submission: GET vs POST

```
GET form:
  Browser appends fields to URL:  ?name=John&age=30
  ↓
  Bookmarkable, visible in URL, limited length (~2KB)
  Use: search forms

POST form:
  Browser sends fields in request body (not URL)
  ↓
  Not bookmarkable, no length limit, data hidden from URL
  Use: login, checkout, file uploads
```

#### The FormData API (JavaScript)

```javascript
// Programmatically access or modify form data before submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();  // stop browser from submitting

  const data = new FormData(form);
  // data.get('username') → "alice"
  // data.getAll('hobbies') → ["reading", "coding"]
  // data.has('email') → true/false

  // Iterate all entries
  for (const [key, value] of data.entries()) {
    console.log(key, value);
  }

  // Send with fetch (multipart/form-data automatically set)
  fetch('/api/submit', { method: 'POST', body: data });
});
```

#### Constraint Validation API

Browsers provide built-in form validation that can be controlled with JavaScript:

```javascript
const input = document.querySelector('#email');

// Check validity
input.checkValidity();       // → true/false
input.reportValidity();      // → shows validation message bubble

// Custom validation
input.setCustomValidity('');                      // clear custom error
input.setCustomValidity('This email is taken');   // set custom error → form won't submit

// ValidityState object
input.validity.valid;        // all constraints satisfied
input.validity.valueMissing; // required but empty
input.validity.typeMismatch; // wrong format (email, url)
input.validity.tooShort;     // below minlength
input.validity.rangeUnderflow; // below min
input.validity.patternMismatch; // doesn't match pattern regex
```

#### Full Form Lifecycle

```
1. User interacts with inputs (types, clicks, selects)
      ↓
2. Browser fires events per interaction:
   - 'input'   → fires on every keystroke/paste/change
   - 'change'  → fires when value is committed (blur or Enter)
   - 'focus'   → element gains keyboard focus
   - 'blur'    → element loses keyboard focus
   - 'invalid' → fires if validation fails on submit
      ↓
3. User clicks submit button or presses Enter in a text field
      ↓
4. Browser fires 'submit' event on the form
      ↓
5. Browser runs constraint validation on all fields
   - If invalid → focus first invalid field, show validation bubble, stop
   - If valid → continue
      ↓
6. Browser serializes form data (URL-encoded or multipart)
      ↓
7. Browser sends HTTP request (GET to URL, POST to body)
      ↓
8. Server responds → browser loads response (or JS handles via fetch)
```

## 8. CSS

CSS (Cascading Style Sheets) controls the visual presentation of HTML.

### How CSS is Applied

1. **Inline**: `<p style="color: red;">`
2. **Internal**: `<style>` tag in `<head>`
3. **External**: `<link rel="stylesheet" href="styles.css">` (most common)
4. **Browser defaults** (user-agent stylesheet)

### Selectors

```css
/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Attribute selector */
[data-type="primary"] { border: 1px solid; }

/* Descendant */
article p { line-height: 1.6; }

/* Child (direct) */
article > p { margin: 0; }

/* Adjacent sibling */
h2 + p { font-weight: bold; }

/* Pseudo-classes */
a:hover { text-decoration: underline; }
input:focus { outline: 2px solid blue; }
li:nth-child(odd) { background: #f5f5f5; }

/* Pseudo-elements */
p::first-line { font-variant: small-caps; }
p::before { content: "→ "; }

/* Combinators combined with modern selectors */
:is(section, article) > :where(h2, h3) { margin-top: 1em; }
```

### Specificity (How Conflicts Are Resolved)

From lowest to highest priority:

1. **Universal selector** (`*`), combinators (`>`, `+`, `~`)
2. **Element selectors** (`p`, `h1`)
3. **Class, attribute, pseudo-class selectors** (`.class`, `[attr]`, `:hover`)
4. **ID selectors** (`#id`)
5. **Inline styles** (`style=""`)
6. **`!important`** — overrides everything (avoid except in utilities)

> **Cascading** means multiple rules can apply. The browser resolves conflicts using specificity, then source order (last rule wins if specificity is equal).

### Box Model

Every element is a rectangular box:

```
┌─────────────────────────────────┐
│           Margin                │
│  ┌───────────────────────────┐  │
│  │         Border            │  │
│  │  ┌─────────────────────┐  │  │
│  │  │      Padding        │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   Content     │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

```css
/* box-sizing: content-box (default) — width = content only */
/* box-sizing: border-box (recommended) — width = content + padding + border */
* { box-sizing: border-box; }
```

### Layout Systems

**Normal Flow** — Default block/inline layout.

**Flexbox** — One-dimensional layout (row OR column):

```css
.container {
  display: flex;
  justify-content: center; /* main axis */
  align-items: center;     /* cross axis */
  gap: 16px;
}
```

**Grid** — Two-dimensional layout (rows AND columns):

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}
```

**Positioning:**
- `static` (default)
- `relative` (offset from normal position)
- `absolute` (relative to nearest positioned ancestor)
- `fixed` (relative to viewport)
- `sticky` (toggles between relative and fixed based on scroll)

### Responsive Design

```css
/* Viewport units: vw, vh, vmin, vmax */
/* Relative units: rem (root em), em, % */

/* Media queries */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

### CSS Variables (Custom Properties)

```css
:root {
  --primary: #3498db;
  --spacing: 16px;
}

.button {
  background: var(--primary);
  margin: var(--spacing);
}
```

---

## 9. JavaScript

JavaScript (JS) is a high-level, interpreted programming language that makes webpages interactive.

### Execution in the Browser

- **Single-threaded** — one thing at a time on the main thread
- **Event loop** — handles async operations (callbacks, promises, async/await)
- **Just-In-Time (JIT) compiled** — modern browsers compile JS to machine code at runtime

### The JavaScript Engine

Every browser has one:

| Browser | Engine |
|---------|--------|
| Chrome / Edge | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore (Nitro) |
| Node.js | V8 (server-side) |

### Basic Syntax

```javascript
// Variables
let name = "Alice";        // mutable, block-scoped
const PI = 3.14159;        // immutable (cannot reassign)
var old = "avoid this";    // function-scoped, hoisted

// Types: string, number, boolean, null, undefined, object, symbol, bigint

// Functions
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;  // Arrow function

// Objects
const person = {
  name: "Bob",
  age: 30,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

// Arrays
const items = [1, 2, 3];
items.push(4);
const doubled = items.map(n => n * 2);
const filtered = items.filter(n => n > 2);

// Promises & Async
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

async function loadData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

### The Event Loop

```
┌───────────┐      ┌─────────────┐
│ Call Stack │ <── │ Task Queue  │
│ (sync)     │     │ (callbacks) │
└───────────┘      └─────────────┘
       │                   ↑
       │    Event Loop     │
       └───────────────────┘
```

1. Execute synchronous code (call stack)
2. When stack is empty, pick next task from task queue
3. Microtasks (Promise callbacks) have priority over macrotasks (setTimeout, events)

---

## 10. The DOM

**DOM (Document Object Model)** is a tree representation of the HTML document that JavaScript can manipulate.

```html
<html>
  <head>...</head>
  <body>
    <div id="app">
      <p class="text">Hello</p>
    </div>
  </body>
</html>
```

Becomes:

```
document
 └── html
      ├── head
      │    ├── meta
      │    ├── title
      │    └── link
      └── body
           ├── div#app
           │    └── p.text
           │         └── "Hello"
           └── script
```

### Common DOM APIs

```javascript
// Selecting elements
document.getElementById('app');
document.querySelector('.text');
document.querySelectorAll('p');
document.getElementsByClassName('text');  // live collection

// Manipulating
const el = document.querySelector('.text');
el.textContent = "New text";           // safe (no HTML)
el.innerHTML = "<b>Bold text</b>";     // parses HTML (XSS risk)
el.style.color = "red";
el.classList.add('active');
el.setAttribute('data-id', '123');

// Creating & inserting
const div = document.createElement('div');
div.textContent = "Dynamic!";
document.body.appendChild(div);

// Events
el.addEventListener('click', (e) => {
  console.log('Clicked!', e.target);
});

// Traversal
el.parentElement;
el.children;
el.nextElementSibling;
el.closest('.container');  // nearest ancestor matching selector
```

> **Virtual DOM** (React) / **Shadow DOM** (Web Components) are abstractions *on top of* the real DOM for performance and encapsulation.

---

## 11. Browser Architecture

A modern browser (Chrome) is multi-process:

```
Browser Process (UI, tab management)
 ├── Network Process (HTTP requests)
 ├── GPU Process (rendering, compositing)
 ├── Storage Process (IndexedDB, localStorage)
 └── Renderer Process (one per tab)
      ├── Main Thread (JS, DOM, CSS)
      ├── Worker Threads (Web Workers)
      ├── Compositor Thread (smooth scrolling)
      └── Raster Threads (pixel rendering)
```

### Site Isolation

Each site gets its own renderer process for security (Chrome). This prevents one tab from accessing another tab's memory (Spectre mitigation).

---

## 12. Web APIs

Browsers expose APIs that JavaScript can use to interact with browser/system features.

### Storage APIs

| API | Storage | Scope | Lifetime | Sync/Async |
|-----|---------|-------|----------|------------|
| **localStorage** | ~5-10MB | Origin | Forever | Sync |
| **sessionStorage** | ~5-10MB | Origin | Tab lifetime | Sync |
| **Cookies** | ~4KB | Origin+path | Set by server | Sync |
| **IndexedDB** | Unlimited (disk) | Origin | Forever | Async |
| **Cache API** | Unlimited (disk) | Origin | Managed | Async |

### Critical Web APIs

```javascript
// Fetch API — modern HTTP requests
fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
});

// WebSockets — bidirectional real-time communication
const ws = new WebSocket('wss://example.com/socket');
ws.onmessage = (event) => console.log(event.data);

// Geolocation
navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});

// Canvas 2D
const ctx = document.querySelector('canvas').getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// Web Workers — background threads
const worker = new Worker('worker.js');
worker.postMessage({ type: 'calculate', data: [1, 2, 3] });
worker.onmessage = (e) => console.log(e.data);

// Intersection Observer — lazy loading, infinite scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // load image, trigger animation, etc.
    }
  });
});
observer.observe(document.querySelector('.lazy'));

// Resize Observer — responsive components
const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log(entry.contentRect.width);
  }
});
ro.observe(document.querySelector('.container'));

// History API — SPA routing
history.pushState({ page: 1 }, 'title', '/page-1');
window.addEventListener('popstate', (e) => {
  // handle back/forward navigation
});

// Service Workers — offline support, push notifications
navigator.serviceWorker.register('/sw.js');
// sw.js intercepts fetch events, caches assets
```

---

## 13. Web Servers

A **web server** is software that listens for HTTP requests and sends back responses.

### Popular Web Servers

| Server | Market Share | Key Strengths |
|--------|-------------|---------------|
| **Nginx** | ~34% | High concurrency, reverse proxy, static file serving |
| **Apache** | ~30% | Flexible, `.htaccess`, widely compatible |
| **Caddy** | Growing | Auto-HTTPS (Let's Encrypt), simple config |
| **IIS** | ~8% | Windows/.NET integration |

### Static vs Dynamic

**Static server:** Serves files as-is (HTML, CSS, JS, images). No server-side processing per request.

**Dynamic server:** Runs application code (PHP, Python, Node.js, Java, Ruby, Go) that generates responses on-the-fly. Often uses a reverse proxy (Nginx) in front of the app server.

### Common Server Config (Nginx)

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    root /var/www/example.com/html;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 14. Databases & the Backend

### Database Types

| Type | Examples | Use Case |
|------|----------|----------|
| **Relational (SQL)** | PostgreSQL, MySQL, SQLite | Structured data, relationships, ACID |
| **Document (NoSQL)** | MongoDB, CouchDB | Flexible schemas, JSON-like documents |
| **Key-Value** | Redis, Memcached | Caching, sessions, real-time |
| **Column-Family** | Cassandra, ScyllaDB | Time-series, wide-column data |
| **Graph** | Neo4j, Dgraph | Social networks, recommendation engines |
| **Search** | Elasticsearch, MeiliSearch | Full-text search, log analytics |

### Backend Languages & Frameworks

| Language | Frameworks |
|----------|-----------|
| **JavaScript/TypeScript** | Node.js (Express, Fastify, NestJS, Hono) |
| **Python** | Django, Flask, FastAPI, Starlette |
| **Java** | Spring Boot, Quarkus, Micronaut |
| **Go** | Gin, Echo, Fiber, standard `net/http` |
| **Ruby** | Ruby on Rails, Sinatra |
| **PHP** | Laravel, Symfony, Wordpress |
| **Rust** | Axum, Actix-Web, Rocket |
| **C#** | ASP.NET Core |
| **Kotlin** | Ktor, Spring Boot |

### Common Backend Architecture

```
Client (Browser)
    ↕ HTTPS
Load Balancer (round-robin requests across servers)
    ↕
Reverse Proxy (Nginx) — static files, rate limiting, SSL termination
    ↕
Application Server(s) — runs backend code
    ↕
Database(s) — SQL + Redis (cache)
```

---

## 15. Web Security

### Critical Threats

| Threat | What It Is | Prevention |
|--------|-----------|------------|
| **XSS** (Cross-Site Scripting) | Attacker injects malicious JS into a page | Escape output, CSP header, sanitize HTML |
| **SQL Injection** | Attacker injects SQL into a query | Parameterized queries / prepared statements |
| **CSRF** (Cross-Site Request Forgery) | Attacker tricks user into performing actions | CSRF tokens, SameSite cookies |
| **Clickjacking** | Attacker embeds your site in an invisible iframe | `X-Frame-Options: DENY` header |
| **MITM** (Man-in-the-Middle) | Attacker intercepts traffic | HTTPS (TLS) everywhere |
| **Session Hijacking** | Stealing session cookies | HttpOnly + Secure + SameSite cookies, regenerate session on login |
| **IDOR** (Insecure Direct Object Reference) | Accessing another user's data by changing an ID | Server-side authorization checks on every request |
| **SSRF** (Server-Side Request Forgery) | Making the server request internal resources | URL allowlists, block private IP ranges |

### Security Headers

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://analytics.example.com
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Same-Origin Policy (SOP)

A script from `https://site-a.com` can only read data from `https://site-a.com`. This prevents malicious sites from reading another site's data.

### CORS (Cross-Origin Resource Sharing)

When a request crosses origins, the browser asks the server for permission via `Access-Control-Allow-Origin` headers.

```
Origin: https://frontend.com
    ↓
Server checks: "Is frontend.com allowed?"
    ↓
Response header: Access-Control-Allow-Origin: https://frontend.com
```

### OWASP Top 10 (2021)

1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable & Outdated Components
7. Identification & Authentication Failures
8. Software & Data Integrity Failures
9. Security Logging & Monitoring Failures
10. SSRF

---

## 16. Cookies, Sessions & Authentication

### Cookies

HTTP is stateless. Cookies add state.

```
Server → Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax
Browser → Cookie: session_id=abc123  (sent with every request to that domain)
```

**Cookie flags:**
- `HttpOnly` — not accessible via JavaScript (prevents XSS cookie theft)
- `Secure` — only sent over HTTPS
- `SameSite=Strict|Lax|None` — prevents CSRF
- `Domain` — which domains receive the cookie
- `Path` — which paths receive the cookie
- `Max-Age` / `Expires` — lifetime

### Token-Based Auth (JWT)

```javascript
// JWT = Header.Payload.Signature
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.xxxxxxxx

// Server signs a token with a secret
// Client stores it (localStorage or cookie)
// Client sends it in Authorization header
fetch('/api/protected', {
  headers: { 'Authorization': 'Bearer ' + token }
});
```

### OAuth 2.0 / OpenID Connect

The standard for "Login with Google/GitHub/etc."

```
User → "Login with Google" → redirected to Google
Google → "User X wants to give this app access. Approve?"
User → Approve
Google → redirects to app with authorization code
App → sends code + client_secret to Google
Google → returns access_token (+ id_token for OIDC)
App → uses token to fetch user info
```

### Common Auth Flows

| Method | How It Works | Pros | Cons |
|--------|-------------|------|------|
| **Session cookies** | Server stores session; cookie has session ID | Revocable, HttpOnly | Server storage, CSRF risk |
| **JWT (stateless)** | Token encodes user data + signature | No server storage, scalable | Cannot revoke, size |
| **OAuth 2.0** | Third-party auth provider | No password management | Complexity |
| **WebAuthn (passkeys)** | Public-key cryptography, biometrics | Phishing-resistant | Requires modern browser/device |

---

## 17. APIs & REST

### REST (Representational State Transfer)

A design pattern for APIs. Resources are identified by URLs, actions by HTTP methods.

```
GET    /api/users          → list users
POST   /api/users          → create user
GET    /api/users/:id      → get user by id
PUT    /api/users/:id      → replace user
PATCH  /api/users/:id      → partially update user
DELETE /api/users/:id      → delete user
GET    /api/users/:id/posts → user's posts
```

Best practices:
- Use nouns for resources (`/users`, not `/getUsers`)
- Use HTTP methods for actions
- Return proper status codes
- Version your API (`/api/v1/users`)
- Paginate lists (`?page=1&limit=20`)

### GraphQL

An alternative to REST where the client specifies exactly what data it needs:

```graphql
query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}
```

### API Architectures Compared

| Style | Description | Best For |
|-------|-------------|----------|
| **REST** | Resources + HTTP methods | CRUD-heavy, simple APIs |
| **GraphQL** | Single endpoint, client queries | Complex/nested data, mobile apps |
| **gRPC** | Binary protocol, protobuf, streaming | Microservices, low-latency |
| **WebSocket** | Full-duplex real-time comm | Chat, live updates, gaming |
| **Webhook** | Server pushes event to your URL | Event-driven, async notifications |

---

## 18. Web Performance

### Core Web Vitals (Google ranking signals)

| Metric | What It Measures | Good | Needs Work | Poor |
|--------|-----------------|------|-----------|------|
| **LCP** (Largest Contentful Paint) | Loading speed | ≤2.5s | 2.5-4.0s | >4.0s |
| **FID** (First Input Delay) | Interactivity | ≤100ms | 100-300ms | >300ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | ≤0.1 | 0.1-0.25 | >0.25 |

**INP (Interaction to Next Paint)** — replaces FID in 2024. Measures all interactions, not just first.

### Performance Optimization Techniques

```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero.webp" as="image">

<!-- Prefetch (for next page user is likely to visit) -->
<link rel="prefetch" href="/next-page" as="document">

<!-- Defer non-critical JS -->
<script src="app.js" defer></script>
<script src="analytics.js" async></script>

<!-- Lazy load images -->
<img src="photo.jpg" loading="lazy" alt="...">
```

**Other techniques:**
- **Minify & compress** (gzip, brotli)
- **Tree-shaking** — remove unused code (especially JS/CSS)
- **Code splitting** — load only what's needed per route
- **Image optimization** — WebP/AVIF, responsive sizes, CDN
- **CDN** (Content Delivery Network) — serve assets from edge locations near users
- **Caching** — `Cache-Control`, ETags, Service Workers
- **Critical CSS** — inline styles for above-the-fold content
- **Font optimization** — `font-display: swap`, subset fonts
- **Reduce third-party scripts** — each one adds load + JS execution

### Network Performance

```
DNS lookup     → ~20-120ms
TCP handshake  → 1 RTT (~50-200ms)
TLS handshake  → 1-2 RTTs (~50-400ms)
HTTP request   → 1 RTT
Total          → at least 3-4 RTTs before first byte arrives
```

**Modern fixes:**
- **HTTP/2 multiplexing** — one connection, multiple parallel streams
- **HTTP/3 (QUIC)** — 0-RTT connection reuse
- **Preconnect** — early DNS + TCP + TLS:

```html
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="//api.example.com">  <!-- fallback -->
```

---

## 19. Modern Web Development

### SPA vs MPA vs SSG vs SSR

| Approach | What It Is | Pros | Cons |
|----------|-----------|------|------|
| **MPA** (Multi-Page App) | Traditional: full page reload per navigation | Simple SEO, works without JS | Slower navigation |
| **SPA** (Single-Page App) | JS loads once, client-side routing | Fast navigation, app-like UX | Slow first load, SEO complex |
| **SSG** (Static Site Generation) | Pre-build HTML at build time | Fastest, secure, cheap hosting | No dynamic per-request content |
| **SSR** (Server-Side Rendering) | Render HTML on server per request | Good SEO, fast initial paint | Server load, more complex |
| **ISR** (Incremental Static Regeneration) | SSG + re-build specific pages on-demand | Best of SSG + dynamic | Complex setup (Next.js) |

### Popular Frontend Frameworks

| Framework | Type | Key Feature | Company |
|-----------|------|-------------|---------|
| **React** | Library | Component model, virtual DOM, huge ecosystem | Meta |
| **Vue** | Framework | Reactive, approachable, progressive | Community |
| **Svelte** | Compiler | No virtual DOM, compiled, tiny bundles | Community |
| **Solid** | Library | Fine-grained reactivity, no vDOM | Community |
| **Angular** | Framework | Full-featured, TypeScript-first, RxJS | Google |
| **Next.js** | React meta-framework | SSR, SSG, ISR, App Router | Vercel |
| **Nuxt** | Vue meta-framework | SSR, SSG, auto-imports | Nuxt Labs |
| **Remix** | React meta-framework | Web standards, nested routes | Shopify |
| **Astro** | Content-focused | Zero JS by default, islands architecture | Community |

### Build Tools

| Tool | Purpose |
|------|---------|
| **Vite** | Dev server + bundler (fast, ESM-based) |
| **Webpack** | Bundler (mature, plugin ecosystem) |
| **Turbopack** | Rust-based bundler (Next.js) |
| **esbuild** | Extremely fast bundler (written in Go) |
| **Rollup** | Bundler focused on treeshaking (libraries) |
| **Parcel** | Zero-config bundler |
| **Babel** | JS transpiler (ES6+ → compatible JS) |
| **SWC** | Rust-based JS/TS transpiler |
| **tsc** | TypeScript compiler |
| **PostCSS** | CSS transformation (autoprefixer, etc.) |
| **Tailwind CSS** | Utility-first CSS framework |

### TypeScript

TypeScript adds static types to JavaScript. Catches errors at compile time, not runtime.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

async function getUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
  // TypeScript ensures returned data matches User shape
}
```

### Testing

```javascript
// Unit test (Vitest/Jest)
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

// Integration test (React Testing Library)
test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});

// E2E test (Playwright/Cypress)
test('user can log in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page.locator('.dashboard')).toBeVisible();
});
```

### DevOps & CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy
on: push to main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - run: npm run deploy
```

---

## 20. Web Hosting & Deployment

### Hosting Options

| Type | Examples | Best For |
|------|----------|----------|
| **Static hosting** | Vercel, Netlify, Cloudflare Pages, GitHub Pages | SPAs, SSG sites, static sites |
| **VPS** | DigitalOcean, Linode, AWS EC2, Hetzner | Full control, custom setup |
| **PaaS** | Railway, Render, Fly.io, Heroku | Apps without managing servers |
| **Serverless** | AWS Lambda, Cloudflare Workers, Vercel Edge | Event-driven, auto-scaling |
| **Containers** | Docker + Kubernetes, AWS ECS, GCP Cloud Run | Portable, scalable microservices |

### The Stack Choices

**Full-Stack JS (JAMstack):**
- Frontend: React/Vue/Svelte → Vite build
- Hosting: Vercel / Netlify / Cloudflare Pages
- Backend: Node.js on serverless functions
- Database: PostgreSQL (via Prisma/Drizzle) + Redis
- Auth: NextAuth / Lucia / Clerk

**Traditional LAMP/LEMP:**
- Linux + (Apache/Nginx) + (MySQL/PostgreSQL) + (PHP/Python)

**Modern Python:**
- FastAPI / Django + PostgreSQL + Redis + Docker

---

## 21. The Full Stack at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT SIDE                           │
│                                                             │
│  Browser ─── HTML ─── CSS ─── JS ─── Web APIs              │
│             (structure) (style) (logic)                     │
│                                                             │
│  Frameworks: React, Vue, Angular, Svelte                    │
│  State: Redux, Zustand, Pinia, Jotai                        │
│  Styling: Tailwind, CSS Modules, Styled Components          │
│  Bundling: Vite, Webpack, Turbopack                         │
│  Testing: Vitest, Playwright, Testing Library               │
├─────────────────────────────────────────────────────────────┤
│                      NETWORK                                │
│                                                             │
│  DNS → CDN → Load Balancer → HTTPS (TLS) → HTTP/2 or /3    │
├─────────────────────────────────────────────────────────────┤
│                      SERVER SIDE                            │
│                                                             │
│  Reverse Proxy: Nginx, Caddy, Traefik                       │
│  App Server: Node, Python, Go, Java, Rust, PHP, Ruby        │
│  API: REST, GraphQL, gRPC, WebSocket                        │
│  Auth: Session, JWT, OAuth, WebAuthn                        │
│  Testing: Pytest, JUnit, Vitest, Playwright                 │
├─────────────────────────────────────────────────────────────┤
│                      DATA LAYER                             │
│                                                             │
│  SQL (PostgreSQL, MySQL)                                    │
│  NoSQL (MongoDB, Redis, Elasticsearch)                      │
│  ORM: Prisma, Drizzle, TypeORM, SQLAlchemy                  │
│  Queue: Redis, Bull, RabbitMQ, Kafka                        │
│  Cache: Redis, Memcached, CDN edge cache                   │
├─────────────────────────────────────────────────────────────┤
│                      INFRASTRUCTURE                         │
│                                                             │
│  Hosting: Vercel, AWS, GCP, Azure, DigitalOcean             │
│  Containers: Docker, Kubernetes                             │
│  CI/CD: GitHub Actions, GitLab CI, CircleCI                 │
│  Monitoring: Sentry, Datadog, Grafana, OpenTelemetry        │
│  Logging: Loki, ELK Stack, Logtail                          │
│  Secrets: Doppler, 1Password, AWS Secrets Manager          │
└─────────────────────────────────────────────────────────────┘
```

---

## 22. Glossary

| Term | Definition |
|------|-----------|
| **AJAX** | Technique for making async server requests (XMLHttpRequest / fetch) |
| **API** | Application Programming Interface — how software components communicate |
| **CDN** | Content Delivery Network — geographically distributed servers that deliver content faster |
| **CORS** | Cross-Origin Resource Sharing — server tells browser which origins are allowed |
| **CRUD** | Create, Read, Update, Delete — the four basic operations for persistent storage |
| **CSRF** | Cross-Site Request Forgery — attack that makes user perform unwanted actions |
| **CSP** | Content Security Policy — HTTP header that prevents XSS by restricting resources |
| **DNS** | Domain Name System — translates domain names to IP addresses |
| **DOM** | Document Object Model — browser's tree representation of HTML |
| **ETag** | HTTP header for cache validation (version identifier) |
| **FOUC** | Flash of Unstyled Content — page briefly renders without CSS |
| **HTTP** | Hypertext Transfer Protocol — protocol for web communication |
| **HTTPS** | HTTP over TLS — encrypted HTTP |
| **IP** | Internet Protocol — addresses devices on a network |
| **JIT** | Just-In-Time compilation — compiling code at runtime for performance |
| **JWT** | JSON Web Token — compact, self-contained token for auth |
| **LCP/FID/CLS** | Core Web Vitals — Google's page experience metrics |
| **MVC** | Model-View-Controller — architectural pattern for apps |
| **MVP** | Minimum Viable Product — simplest version that provides value |
| **MFA** | Multi-Factor Authentication — extra layer of security beyond password |
| **MITM** | Man-in-the-Middle — attacker intercepts communication |
| **ORM** | Object-Relational Mapping — maps database tables to code objects |
| **REST** | Representational State Transfer — API design principles |
| **RTT** | Round-Trip Time — time for a signal to go and come back |
| **SEO** | Search Engine Optimization — making sites rank higher in search results |
| **SOP** | Same-Origin Policy — browser security that restricts cross-origin reads |
| **SPA** | Single-Page Application — app that dynamically rewrites the current page |
| **SSG** | Static Site Generation — pre-building HTML at build time |
| **SSR** | Server-Side Rendering — rendering HTML on the server per request |
| **TCP** | Transmission Control Protocol — reliable, ordered data delivery |
| **TLS** | Transport Layer Security — encrypts network communication |
| **TTFB** | Time to First Byte — server response time |
| **TTI** | Time to Interactive — when page is fully interactive |
| **UDP** | User Datagram Protocol — fast, unreliable data delivery |
| **URI/URL/URN** | Uniform Resource Identifier/Locator/Name — addresses for resources |
| **W3C** | World Wide Web Consortium — web standards body |
| **WebSocket** | Full-duplex communication protocol over TCP |
| **XSS** | Cross-Site Scripting — injecting malicious scripts into pages |

---

> **The web is for everyone.** — Sir Tim Berners-Lee
