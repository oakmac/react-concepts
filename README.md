# React Examples

This purpose of this repo is to teach the concepts behind [React.js]
incrementally using a login form.

[React.js]:https://reactjs.org/

## Notes

* React.js is a way of managing UI / DOM state using components.
  * Instead of having a stateful DOM (ie: the default), you model exactly
    what your UI should look like at any point in time using components.
  * React applications are made up of Components, which represent a Virtual DOM.
    This Virtual DOM is an in-memory representation of what the real DOM should
    be at any given point in time.
  * When using React.js, you think about your UI as being a piece of data that
    changes over time. ie: given some data, what should the DOM look like right now?
  * The React.js library handles **all** real DOM updates (create, delete, modify, etc)
    based on your components. You never modify the DOM directly when using React.js.
* Example 1 shows a "normal" UI with stateful DOM elements, and using jQuery to
  handle events and change the DOM as needed.
  * We have a function `domToData` that reads the DOM and builds a data structure
    that represents the value of our UI at any point in time.
  * This data is shown as JSON on the right.
* Example 2 shows that given some data (ie: the JSON on the right), we can build
  the UI using functions that build the entire UI from scratch with every change.
  * This example mirrors the way that React.js works conceptually.
  * Except that React.js does not re-build everything from scratch. It intelligently
    makes only the updates needed to get from "State 12" to "State 13"

## License

[ISC License](LICENSE.md)
