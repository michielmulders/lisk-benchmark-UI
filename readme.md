# Lisk Benchmark UI (WIP)
Side project to create a UI for a basic [benchmarking script](https://gist.github.com/pablitovicente/99f663e5e59980cd1abde1996a5c0c8a) created by @pablitovicente
The UI expects you to input the amount of tx you want to send and the `hostname:port` of your Lisk app.
It will prepare and download a script for you with the given parameters which you can simply run with `node`.

## Usage
Open the index.html file in your web browser.

## Improvements
- Instead of using this Gist, move to a tool like [Siege HTTP Load Testing](https://github.com/JoeDog/siege) which gives better insights/reporting.
- Log results when benchmarking is completed (`/api/node/status` or calculate)
- Add the possibility to send a mix of transactions instead of only `transfer` transactions.
- Add validation again in `generate.js` by copying it from `main.js`.

## Current UI
![Current Benchmark UI](images/screenshot-ui.png)

## Source
Source UI template: https://colorlib.com/wp/template/login-form-v11/
