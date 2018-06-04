;(function () {
  var $ = window.jQuery

  // ---------------------------------------------------------------------------
  // DOM Manipulation
  // ---------------------------------------------------------------------------

  // shows the current state of the UI as JSON inside the <pre id="data"> element
  function showStateAsJSON (_evt) {
    $('#data').html(JSON.stringify(domToData(), null, 2))
  }

  // returns a data structure (a JS object) of the state of the UI
  function domToData () {
    return {
      name: $('#nameInput').val(),
      email: $('#emailInput').val(),
      password1: $('#password1Input').val(),
      password2: $('#password2Input').val(),
      isSubmitting: false
    }
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  function submitForm (evt) {
    evt.preventDefault()
  }

  function addEvents () {
    $('#theForm').on('submit', submitForm)
    $('#theForm input').on('keyup', showStateAsJSON)
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  function init () {
    addEvents()
    showStateAsJSON()
  }

  $(init)
})()
