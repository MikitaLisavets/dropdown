(function(){
  const jsDropdown = function(options) {
    let dropdownEl, selectionsEL, listEL;
    const classNames= {
      dropdown: 'js-dropdown',
      selections: 'js-dropdown-selections',
      selectionList: 'js-dropdown-selection-list',
      item: 'js-dropdown-item',
      selected: 'selected',
      list: 'js-dropdown-list',
      page: 'js-dropdown-page',
      paginator: 'js-dropdown-paginator'
    }
    let model = {
      selections: [],
      list: [],
      page: 1,
      maxItemsPerPage: 5
    }

    initModel(options.items)
    initElement(options.element)

    function initModel(items) {
      model.list = items
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

      selectionsEl.appendChild(selectionsTemplate(model.selections))
      listEl.appendChild(pageTemplate(model.list, model.page, model.maxItemsPerPage))
      if (model.list.length > model.maxItemsPerPage) {
        listEl.appendChild(paginatorTemplate(model.list.length, model.maxItemsPerPage))
      }
      bindEvents(element)
    }

    function dropdownTemplate() {
      return (
        `<div class="${classNames.dropdown}">
          <div class="${classNames.selections}"></div>
          <div class="${classNames.list}"></div>
        </div>`
      )
    }

    function selectionsTemplate(selections) {
      let selectionList = document.createElement('ul')
      selectionList.classList.add(classNames.selectionList)
      selections.forEach(selectionItem => {
        let li = document.createElement('li')
        li.innerHTML = selectionItem.title
        li.dataset.value = selectionItem.value
        selectionList.appendChild(li)
      })

      return selectionList
    }

    function pageTemplate(list, pageNumber, maxItemsPerPage) {
      let page = document.createElement('ul')
      page.classList.add(classNames.page)
      list.slice((pageNumber - 1) * maxItemsPerPage, maxItemsPerPage).forEach(item => {
        let li = document.createElement('li')
        li.innerHTML = item.title
        li.dataset.value = item.value
        li.classList.add(classNames.item)
        if (model.selections.some((selectedElement) => selectedElement.value === item.value)) {
          li.classList.add(classNames.selected)
        }
        page.appendChild(li)
      });
      return page
    }

    function paginatorTemplate(itemCount, maxItemsPerPage) {
      const count = Math.ceil(itemCount / maxItemsPerPage)
      let paginator = document.createElement('ul')
      paginator.classList.add(classNames.paginator)
      for (let i = 1; i <= count; i++) {
        let li = document.createElement('li', i)
        li.innerHTML = i
        paginator.appendChild(li)
      }
      return paginator
    }
  }

  window.jsDropdown = jsDropdown
}())