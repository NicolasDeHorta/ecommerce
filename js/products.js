let productsArray = []

const fetchProducts = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    data.forEach((item) => productsArray.push(item))
    showList(productsArray)
}

fetchProducts(PRODUCTS_URL)


const showList = list => {
    // Funcion que muestre la lista actual del array de productos
    let htmlContentToAppend = "";

    list.forEach(product => {
        htmlContentToAppend += `
        <div class="col-md-4">
        <div class="list-group-item list-group-item-action" onclick="redirect('${product.name}', '${product.imgSrc}', '${product.description}', '${product.cost}')">
        <img src=" ${product.imgSrc}" alt=" ${product.desc} " class="img-thumbnail">
        <h4 class="mb-1"> ${product.name} </h4>
        <small class="text-muted"> ${product.soldCount} vendidos</small>
          <div class="card-body">
          <h5 lass="mb-1"> US$  ${product.cost} </h5>
          <br><p class="text-muted">${product.description} </p>
          </div>
        </div>
    </div>
        `

        })
        
        $("#products-list").html(htmlContentToAppend) 

}

var redirect = (name, imgSrc, description, cost) => {
    sessionStorage.setItem('autoName', name)
    sessionStorage.setItem('autoimgSrc', imgSrc)
    sessionStorage.setItem('autoDesc', description)
    sessionStorage.setItem('autoCost', cost)
    window.location.href = "product-info.html"
}

var sortList = parameter => {
    switch (parameter) {
        case 'priceAsc':
            productsArray.sort((a, b) => parseInt(a.cost) - parseInt(b.cost))
            break;
        case 'priceDesc':
            productsArray.sort((a, b) => parseInt(b.cost) - parseInt(a.cost))
            break;
        case 'countAsc':
            productsArray.sort((a, b) => parseInt(a.soldCount) - parseInt(b.soldCount))
            break;
        case 'countDesc':
            productsArray.sort((a, b) => parseInt(b.soldCount) - parseInt(a.soldCount))
            break;
        case 'alphabeticalAsc':
            productsArray.sort((a,b) => a.name > b.name ? 1 : -1)
            break;
        case 'alphabeticalDesc':
            productsArray.sort((a,b) => a.name < b.name ? 1 : -1)
            break;
        case 'filterReset':
            showList(productsArray)
            $("#filterMax").val(undefined)
            $("#filterMin").val(undefined)
            break;
    }
    showList(productsArray)
}

var filterList = () => {
    
    let min = $("#filterMin").val()
    let max = $("#filterMax").val()
    
    if (min){
        if (max){
        showList(productsArray.filter(item => {return (parseInt(item.cost) < max && parseInt(item.cost) > min)} ))
        } else {
            showList(productsArray.filter(item => {return (parseInt(item.cost) > min)} ))
        }
    } else if (max) {
        showList(productsArray.filter(item => {return (parseInt(item.cost) < max)} ))
    }
}

var filterText = () => {
    let text = $("#search-bar").val().toLowerCase()
    text != undefined ? showList(productsArray.filter(item => {return ( item.name.toLowerCase().includes(text) || item.description.toLowerCase().includes(text))} )) : null
}
//Botones de filtros
$("#filter-price-ascending").click(() => sortList('priceAsc')) 
$("#filter-price-descending").click(() => sortList('priceDesc')) 
$("#filter-count-ascending").click(() => sortList('countAsc')) 
$("#filter-count-descending").click(() => sortList('countDesc')) 
$("#filter-alphabetical").click(() => sortList('alphabeticalAsc')) 
$("#filter-anti-alphabetical").click(() => sortList('alphabeticalDesc')) 
$("#filter-reset").click(() => sortList('filterReset'))
$("#price-range").click(() => filterList())
$("#search-bar").keydown(() => filterText())
