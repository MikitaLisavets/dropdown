(function(){
  const jsDropdown = function(options) {
    let dropdownEl, selectionsEl, listEl;

    const classNames= {
      dropdown: 'js-dropdown',
      selections: 'js-dropdown-selections',
      selectionList: 'js-dropdown-selection-list',
      selectionItem: 'js-dropdown-selection-item',
      item: 'js-dropdown-item',
      selected: 'selected',
      list: 'js-dropdown-list',
      page: 'js-dropdown-page',
      paginator: 'js-dropdown-paginator',
      paginatorItem: 'js-dropdown-paginator-item',
      placeholder: 'js-dropdown-placeholder'
    };

    let model = {
      selections: [],
      list: [],
      page: 1,
      maxItemsPerPage: 6,
      placeholderText: 'Select...'
    };

    initModel(options.items);
    initElement(options.element);

    function initModel(items) {
      model.list = items;
    }

    function bindEvents() {
      selectionsEl.addEventListener('click', (event) => {
        if (event.target.closest('.' + classNames.selectionList)) {
          removeItem(event);
        } else {
          toggleDropdown(event);
        }
      });

      listEl.addEventListener('click', (event) => {
        if (event.target.closest('.' + classNames.paginator)) {
          changePage(event);
        } else if (event.target.closest('.' + classNames.page)) {
          selectItem(event);
        }
      });
    }

    function toggleDropdown(event) {
      event.preventDefault();
      dropdownEl.classList.toggle('open');
    }

    function changePage(event) {
      event.preventDefault();
      const selectedPage = event.target.dataset.value;
      if (!selectedPage) return;
      model.page = +selectedPage;
      renderDropdown();
    }

    function removeItem(event) {
      event.preventDefault();
      const selectedItemValue = event.target.dataset.value;
      if (!selectedItemValue) return;
      removeItemFromSelections(selectedItemValue);

      model.list.some((listItem) => {
        if (listItem.value !== selectedItemValue) return;
        listItem.selected = false;
        return true;
      });
      renderDropdown();
    }

    function selectItem(event) {
      event.preventDefault();
      const selectedItemValue = event.target.dataset.value;
      if (!selectedItemValue) return;
      removeItemFromSelections(selectedItemValue);

      model.list.some((listItem) => {
        if (listItem.value !== selectedItemValue) return;
        if (listItem.selected) {
          listItem.selected = false;
        } else {
          listItem.selected = true;
          model.selections.push({
            title: listItem.title,
            value: listItem.value
          });
        }
        return true;
      });
      renderDropdown();
    }

    function removeItemFromSelections(value) {
      model.selections.some((selectionItem, index) => {
        if (selectionItem.value !== value) return;
        model.selections.splice(index, 1);
        return true;
      });
    }
    
    function clearDropdown() {
      selectionsEl.innerHTML = '';
      listEl.innerHTML = '';
    }

    function renderDropdown() {
      clearDropdown();
      selectionsEl.appendChild(selectionsTemplate(model.selections));
      listEl.appendChild(pageTemplate(model.list, model.page, model.maxItemsPerPage));
      if (model.list.length > model.maxItemsPerPage) {
        listEl.appendChild(paginatorTemplate(model.list.length, model.page, model.maxItemsPerPage));
      }
    }

    function initElement(element) {
      element.innerHTML = dropdownTemplate();
      dropdownEl = element.getElementsByClassName(classNames.dropdown)[0];
      selectionsEl = dropdownEl.getElementsByClassName(classNames.selections)[0];
      listEl = dropdownEl.getElementsByClassName(classNames.list)[0];
      renderDropdown();
      bindEvents();
    }

    function dropdownTemplate() {
      return (
        `<div class="${classNames.dropdown}">
          <div class="${classNames.selections}"></div>
          <div class="${classNames.list}"></div>
        </div>`
      );
    }

    function placeholderTemplate() {
      let placeholder = document.createElement('div');
      placeholder.classList.add(classNames.placeholder);
      placeholder.innerHTML = model.placeholderText;
      return placeholder;
    }

    function selectionsTemplate(selections) {
      if (!selections.length) { return placeholderTemplate(); }

      let selectionList = document.createElement('ul');
      selectionList.classList.add(classNames.selectionList);
      selections.forEach(selectionItem => {
        let li = document.createElement('li');
        li.innerHTML = selectionItem.title;
        li.dataset.value = selectionItem.value;
        li.classList.add(classNames.selectionItem);
        selectionList.appendChild(li);
      });

      return selectionList;
    }

    function pageTemplate(list, pageNumber, maxItemsPerPage) {
      let page = document.createElement('ul');
      page.classList.add(classNames.page);
      list.slice((pageNumber - 1) * maxItemsPerPage, pageNumber * maxItemsPerPage).forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item.title;
        li.dataset.value = item.value;
        li.classList.add(classNames.item);
        if (model.selections.some((selectedElement) => selectedElement.value === item.value)) {
          li.classList.add(classNames.selected);
        }
        page.appendChild(li);
      });
      return page;
    }

    function paginatorTemplate(itemCount, page, maxItemsPerPage) {
      const count = Math.ceil(itemCount / maxItemsPerPage);
      let paginator = document.createElement('ul');
      paginator.classList.add(classNames.paginator);
      for (let i = 1; i <= count; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        li.dataset.value = i;
        li.classList.add(classNames.paginatorItem);
        if (page === i) {
          li.classList.add(classNames.selected);
        }
        paginator.appendChild(li);
      }
      return paginator;
    }
  };

  window.jsDropdown = jsDropdown;
}());