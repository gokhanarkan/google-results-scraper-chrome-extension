# Google Scraper Chrome Extension

**Disclaimer**
This repository created for a task, it has no real world usage at all.

## Folders

There are two folders in this repository, in which one is the `Chrome Extension` and the other one is the `Express Server`.

## Chrome Extension

Simply activate the Developer Mode on Google Chrome browser and Load the `extension` folder.

The extension will only work on a Google results page, so if you run it somewhere else it alerts the user.

## Server

Simply run

```
yarn install
```

to download the modules needed.

`app.js` => Main application.
`test.js` => Where tests located.

There are three commands within the server application.

### Dev

This will run the application in development mode, so whenever a change happens nodemon refreshes the server.

### Test

Mocha & Chai will send test payloads to the `POST /` endpoint (only endpoint in the application anyway).

The response statuses vary between 200, 422, and 500 depending on the payload.

### Start

This command will simply run the server in production mode.
