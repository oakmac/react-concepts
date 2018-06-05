;(function () {
  var $ = window.jQuery

  // ---------------------------------------------------------------------------
  // Util
  // ---------------------------------------------------------------------------

  function randomInt (min, max) {
    return Math.random() * (max - min) + min
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  function htmlEscape (aString) {
    return String(aString).replace(/[&<>"'`=/]/g, function (s) {
      return entityMap[s]
    })
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
    var formData = {
      name: $('#nameInput').val(),
      email: $('#emailInput').val(),
      password1: $('#password1Input').val(),
      password2: $('#password2Input').val(),
      isSubmitting: $('#submitBtn').attr('disabled') === 'disabled',
      errorsShowing: $('#errors').css('display') !== 'none',
      successShowing: $('#successMessage').css('display') !== 'none'
    }

    formData.errors = formErrors(formData)

    return formData
  }

  function showLoadingState () {
    $('#theForm input').attr('disabled', true)
    $('#submitBtn').val('Submitting …')
  }

  function clearLoadingState () {
    $('#theForm input').attr('disabled', false)
    $('#submitBtn').val('Submit')
  }

  function resetForm () {
    $('#successMessage').hide()
    $('#theForm').show()

    $('#nameInput').val('')
    $('#emailInput').val('')
    $('#password1Input').val('')
    $('#password2Input').val('')

    clearErrors()

    showStateAsJSON()
  }

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

    if (formData.name === '') {
      errors.push('Please enter a username.')
    }

    if (formData.email === '') {
      errors.push('Please enter an email address.')
    }

    if (formData.email !== '' && formData.email.indexOf('@') === -1) {
      errors.push('Please enter a valid email address.')
    }

    if (formData.password1 === '') {
      errors.push('Please enter a password.')
    }

    if (formData.password1 !== '' && formData.password1 !== formData.password2) {
      errors.push('Passwords do not match.')
    }

    return errors
  }

  function showSuccessMessage () {
    $('#theForm').hide()
    $('#successMessage').show()
  }

  function formSubmissionFinished () {
    clearLoadingState()
    showSuccessMessage()
    showStateAsJSON()
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
      window.setTimeout(formSubmissionFinished, randomInt(1500, 2000))
    } else {
      showErrors(errors)
    }

    showStateAsJSON()
  }

  function addEvents () {
    $('#theForm').on('submit', submitForm)
    $('#theForm input').on('keyup', showStateAsJSON)
    $('#okBtn').on('click', resetForm)
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
