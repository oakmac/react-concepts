;(function () {
  var $ = window.jQuery

  // ---------------------------------------------------------------------------
  // Util
  // ---------------------------------------------------------------------------

  function randomInt (min, max) {
    return Math.random() * (max - min) + min
  }

  function htmlEscape (s) {
    // TODO: write me
    return s
  }

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
      isSubmitting: $('#submitBtn').attr('disabled') === 'disabled'
    }
  }

  function showLoadingState () {
    $('#theForm input').attr('disabled', true)
    $('#submitBtn').val('Submitting …')
  }

  function clearLoadingState () {
    $('#theForm input').attr('disabled', false)
    $('#submitBtn').val('Submit')
  }

  // function resetForm () {
  //
  // }

  function buildErrorRowHtml (err) {
    return '<li>' + htmlEscape(err) + '</li>'
  }

  function showErrors (errors) {
    var errorsListHtml = '<ul>' + errors.map(buildErrorRowHtml).join('') + '</ul>'
    $('#errors').html(errorsListHtml)
                .show()
  }

  function clearErrors () {
    $('#errors').html('').hide()
  }

  // do some basic form validation
  // NOTE: for a real application you would want to use a library for this
  function formErrors (formData) {
    var errors = []

    if (formData.name === '') errors.push('Please enter a username.')
    if (formData.email === '') errors.push('Please enter an email address.')
    if (formData.password1 === '') errors.push('Please enter a password.')
    if (formData.password1 !== formData.password2) errors.push('Passwords do not match.')

    return errors
  }

  function formSubmissionFinished () {
    clearLoadingState()
    showStateAsJSON()
    // showSuccess()
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  function submitForm (evt) {
    // prevent form submission
    evt.preventDefault()

    // clear any previous errors
    clearErrors()

    var errors = formErrors(domToData())

    if (errors.length === 0) {
      showLoadingState()
      // simulate an AJAX request
      window.setTimeout(formSubmissionFinished, randomInt(1000, 2000))
    } else {
      showErrors(errors)
    }

    showStateAsJSON()
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
