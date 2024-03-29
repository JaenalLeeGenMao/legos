![background](./legos-readme.png)

This component was bootstrapped with [Direflow](https://direflow.io).

# Wc Legos

> common components made by OVO

```html
<wc-button></wc-button>
<wc-button label="kamekameha"></wc-button>

<wc-input></wc-input>
<wc-input placeholder="yolooo"></wc-input>
<wc-input pattern="\d+"></wc-input> // accepting only number, default accepts only string

<!-- vue sample component BottomSheet - START -->
export default {
  data() {
    return {
      open: false
    }
  },
  methods: {
    openBottomSheet(e) {
      this.open = true
    },
    closeBottomSheet(e) {
      this.open = false
    }
  }
}

/* RENDER */
<button @click="openBottomSheet">open bottom shit</button>
<wc-bottom-sheet :open="open" @event-close="closeBottomSheet">
  <p style="color: 'pink'">nande monaiya</p>
</wc-bottom-sheet>
<!-- vue sample component BottomSheet - END -->

<!-- React sample component BottomSheet - START -->
import { useState, useRef } from 'react';
import useEventListener from '~/custom-hooks/useEventListener';

const [open, setOpen] = useState(false);
const CustomBottomSheet = useRef();

const callback = (payload) => {
  setOpen(!open);
}

useEventListener('event-close', callback, CustomBottomSheet.current);

/* RENDER */
<button onClick={() => setOpen(!open)}>open bottom shit</button>
<wc-bottom-sheet ref={CustomBottomSheet} open={open}>
  <p style={{ color: "pink" }}>nande monaiya</p>
</wc-bottom-sheet>
<!-- React sample component BottomSheet - END -->

```

## List of events

| components      | events       | return               | type             |
| --------------- | ------------ | -------------------- | ---------------- |
| wc-button       | event-click  | (eventName, payload) | (string, object) |
| wc-input        | event-change | (eventName, payload) | (string, object) |
| wc-bottom-sheet | event-close  | (eventName, payload) | (string, object) |

## How to use

To start locally

```
npm run start
```

## Using in other repository

- RUN npm run build
- copy and paste the build/wc-legos.js file into public folder or root directory parallel to index.html
- inside index.html import the script

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
    <script src="/wc-legos.js" defer></script>
    <script type="module" src="/src/main.jsx" defer></script>
  </body>
</html>
```

## Why Web Components

To give you a history of how we decided on using web components.
Javascript has been moving at a very fast pace, every year new frameworks are introduced to solve new problems. To tackle this diversity of frameworks, web component is one of the leap we need to embrace. Web component works on basic html5, every framework runs on html. You get the idea, well it seems to good to be true what are the cons? good question, web component only support modern browser. This is one of the tradeoffs you as a developer should decide.

## Deployment

From today onwards I decided to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). I will be using [standard version](https://www.npmjs.com/package/standard-version) to generate my changelog since I prefer automated versioning.

We can also see here that Standard Version automatically committed all of the changes to the changelog.

The Standard Version suggests that we now run `git push --follow-tags origin master`. This pushes all of our changes along with the tags.

When Standard Version runs, it figures out the changelog and the version by comparing the changes with the latest tag version on your local repository. If you don’t have the latest tags fetched, you might run into unexpected results when generating the changelog. I’ve bumped into this issue in the past.

To make sure that you have all of the tags fetched, you can run `git fetch --all --tags`.

To ensure that things on changelog are behaving as expected, you can

| Commands                       | Notes                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `npm run release -- --dry-run` | with the flag `--dry-run` allows you to see what commands would be run, without committing to git or updating files. |
