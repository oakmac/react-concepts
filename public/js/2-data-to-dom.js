;(function () {
  var $ = window.jQuery

  // ---------------------------------------------------------------------------
  // Util
  // ---------------------------------------------------------------------------

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

  function template (str, obj) {
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) continue

      // unescaped
      var unescapedTemplateStr = '{{{' + key + '}}}'
      var value = obj[key]
      while (str.indexOf(unescapedTemplateStr) !== -1) {
        str = str.replace(unescapedTemplateStr, value)
      }

      // escaped
      var escapedTemplateStr = '{{' + key + '}}'
      var htmlValue = htmlEscape(value)
      while (str.indexOf(escapedTemplateStr) !== -1) {
        str = str.replace(escapedTemplateStr, htmlValue)
      }
    }
    return str
  }

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

  var initialState = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    isSubmitting: false,
    errorsShowing: false,
    successShowing: false,
    errors: []
  }

  // ---------------------------------------------------------------------------
  // Build DOM
  // ---------------------------------------------------------------------------

  function buildErrorRowHtml (err) {
    return '<li>' + htmlEscape(err) + '</li>'
  }

  function buildErrors (uiData) {
    var html = '<div id="errors" class="errors-bar"'

    if (!uiData.errorsShowing) {
      html += ' style="display:none"'
    }

    html += '>'

    if (uiData.errors && uiData.errors.length > 0) {
      html += '<ul>' + uiData.errors.map(buildErrorRowHtml).join('') + '</ul>'
    }

    html += '</div>'

    return html
  }

  function buildSubmitBtn (uiData) {
    if (uiData.isSubmitting) {
      return '<input type="submit" value="Submitting … " id="submitBtn" class="big-btn" disabled="disabled" />'
    } else {
      return '<input type="submit" value="Submit" id="submitBtn" class="big-btn" />'
    }
  }

  function buildForm (uiData) {
    var html = '<h2>UI</h2>' +
      '<form id="theForm" {{{formStyle}}}>' +
          '<div class="input-row">' +
              '<label>Name</label>' +
              '<input type="text" id="nameInput" name="name" value="{{name}}" {{{disabled}}}/>' +
          '</div>' +
          '<div class="input-row">' +
              '<label>Email</label>' +
              '<input type="text" id="emailInput" name="email" value="{{email}}" {{{disabled}}}/>' +
          '</div>' +
          '<div class="input-row">' +
              '<label>Password</label>' +
              '<input type="password" id="password1Input" name="password1" value="{{password1}}" {{{disabled}}}/>' +
          '</div>' +
          '<div class="input-row">' +
              '<label>Password (again)</label>' +
              '<input type="password" id="password2Input" name="password2" value="{{password2}}" {{{disabled}}}/>' +
          '</div>' +
          buildErrors(uiData) +
          '<div class="action-row">' +
              buildSubmitBtn(uiData) +
          '</div>' +
      '</form>'

    uiData.disabled = ''
    if (uiData.isSubmitting) {
      uiData.disabled = 'disabled="disabled" '
    }

    uiData.formStyle = ''
    if (uiData.successShowing) {
      uiData.formStyle = 'style="display:none"'
    }

    return template(html, uiData)
  }

  function buildSuccessPage (successShowing) {
    var html = '<div id="successMessage"'

    if (!successShowing) {
      html += ' style="display:none"'
    }

    html += '>' +
      '<h3>Success!</h3>' +
      '<p>We just sent you a bunch of sign-up emails. Please check your email.</p>' +
      '<p><button id="okBtn" class="big-btn">Ok</button></p>' +
    '</div>'

    return html
  }

  function buildUI (uiData) {
    var html = buildForm(uiData) +
               buildSuccessPage(uiData.successShowing)

    return html
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  function renderUI (evt) {
    var inputTxt = $('#jsonInput').val()
    var uiData = null

    try {
      uiData = JSON.parse(inputTxt)
    } catch (e) { }

    if (uiData) {
      $('#leftSection').html(buildUI(uiData))
    }
  }

  function addEvents () {
    $('#jsonInput').on('keyup', renderUI)
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  function init () {
    addEvents()
    $('#jsonInput').val(JSON.stringify(initialState, null, 2))
    renderUI()
  }

  $(init)
})()
