This component was bootstrapped with [Direflow](https://direflow.io).

# Wc Legos
> common components made by OVO

```html
<wc-button></wc-button>
<wc-button label="kamekameha"></wc-button>

<wc-input></wc-input>
<wc-input placeholder="yolooo"></wc-input>
<wc-input pattern="\d+"></wc-input> // accepting only number, default accepts only string
```

## List of events

| components | events | return | type |
| - | - | - | - |
| wc-button | event-click | (eventName, payload) | (string, object) |
| wc-input | event-change | (eventName, payload) | (string, object) |

## How to use
To start locally
```
npm run start
```

## Using in other repository
- RUN `npm run build`
- copy and paste the `build/wc-legos.js` file into public folder or root directory parallel to `index.html`
- inside `index.html` import the script

> This is only an example, please adjust accordingly
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx" async></script>
    <script src="./wc-legos.js" async></script>
  </body>
</html>
```

## Why Web Components
To give you a history of how we decided on using web components.
Javascript has been moving at a very fast pace, every year new frameworks are introduced to solve new problems. To tackle this diversity of frameworks, web component is one of the leap we need to embrace. Web component works on basic html5, every framework runs on html. You get the idea, well it seems to good to be true what are the cons? good question, web component only support modern browser. This is one of the tradeoffs you as a developer should decide.