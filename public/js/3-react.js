;(function () {
  // alias "createElement" for readability
  var e = window.React.createElement

  // ---------------------------------------------------------------------------
  // Util
  // ---------------------------------------------------------------------------

  function randomInt (min, max) {
    return Math.random() * (max - min) + min
  }

  // ---------------------------------------------------------------------------
  // Components
  // ---------------------------------------------------------------------------

  // by convention, React components start with a capital letter
  function App () {
    return e('h1', {}, 'React!!!')
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  var containerEl = document.getElementById('leftSection')

  function init () {
    window.ReactDOM.render(e(App), containerEl)
  }

  init()
})()
