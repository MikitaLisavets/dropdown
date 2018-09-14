(function(){
  const jsDropdown = function(options) {
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

    function initElement(element) {
      element.innerHTML = dropdownTemplate()
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