# React Concepts

The purpose of this repo is to show how UI and Data can be related. First by
showing that UI can map to Data, then by showing that Data can map to UI.

The idea is to show this concept using existing tools, then introduce the [React.js]
library as it has this idea at the core.

[React.js]:https://reactjs.org/

## State and the DOM

* Definitions: What is state?
  * A value is some piece of data. A string, a number, an object, etc.
  * State is when some reference (ie: a variable) changes value over time.

* By default, the DOM is always stateful. You can modify anything at any time.
  * You don't need "permission" to make changes on the page. Anything can edit anything at any time.
  * As the complexity of your UI grows, this becomes unmanageable.
  * What is the "value" of your UI? Depends on what "time" it is.

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

## Enter React.js

* Try to throw away what you currently know about managing state. React.js is a new paradigm.

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

* [create-react-app](https://github.com/facebook/create-react-app#creating-an-app)
  * helps to reduce build setup and complexity
  * "when in Rome" - best to adopt and use this tool

* Let's build an app!

* "elements" vs "components"
  * elements are normal DOM elements, think: `<div>`, `<input />`, `<header>`, etc
  * components are user-defined and more complex
    * components always start with a capital letter
    * they have lifecycle hooks

* `props` vs `state`
  * `props` are the immutable arguments to a component. Think of them as arguments to a function
    * In functional components, they literally are this.
  * `state` is the internal state of a component
    * Some components need state in order to function.
    * `state` is only accessible in Class-based components

* Functional vs Class-based components
  * Where possible, always prefer Functional components
    * They are at the core of what React.js is. 95% of your components should be Functional
    * Functional components are simpler to reason about, easier to manage, more composable
    * Functional components always receive one argument: `props`, which is an Object of data
  * Class-based components are necessary when you need to hook into the lifecycle events
    * If you are building a Class-based component and it is growing in size, consider
      breaking it up into smaller components

## Development Setup

Run a local webserver out of the `/public` folder. For example:

```sh
cd public
python -m SimpleHTTPServer
```

## License

[ISC License](LICENSE.md)
