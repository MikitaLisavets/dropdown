(function(){
  const jsDropdown = function(options) {
    let dropdownEl, selectionsEL, listEL;
    const classNames= {
      dropdown: 'js-dropdown',
      selections: 'js-dropdown-selections',
      list: 'js-dropdown-list'
    }
    let model = {
      selections: [],
      list: [],
      page: 1,
      maxItemsPerPage: 5
    }

    initModel(options.list)
    initElement(options.element)

    function initModel(list) {
      model.list = list
    }

    function bindEvents(element) {
      selectionsEl.addEventListener('click', toggleDropdown)
    }

    function toggleDropdown(event) {
      event.preventDefault()
      dropdownEl.classList.toggle('open')
    }

    function initElement(element) {
      element.innerHTML = dropdownTemplate()
      dropdownEl = element.getElementsByClassName(classNames.dropdown)[0]
      selectionsEl = dropdownEl.getElementsByClassName(classNames.selections)[0]
      listEl = dropdownEl.getElementsByClassName(classNames.list)[0]
      bindEvents(element)
    }

    function dropdownTemplate() {
      return (
        `<div class="${classNames.dropdown}">
          <div class="${classNames.selections}"></div>
          <ul class="${classNames.list}"></ul>
        </div>`
      )
    }
  }

  window.jsDropdown = jsDropdown
}())