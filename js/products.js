var currentProductsArray = [];
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COST = "Cant.";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;



function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src=" ${product.imgSrc}" alt=" ${product.desc} " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1"> ${product.name} </h4>
                        <small class="text-muted"> ${product.soldCount} vendidos</small>
                    </div>
                    <h5 class="mb-1"> US$  ${product.cost} </h5>
                    <br><p class="text-muted">${product.description} </p>
                </div>
                
            </div>
        </div>
        `
            }
        $("#products-list").html(htmlContentToAppend) 
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}




    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    $("#sortAsc").click(() => sortAndShowProducts(ORDER_ASC_BY_NAME));

    $("#sortDesc").click(() => sortAndShowProducts(ORDER_DESC_BY_NAME));

    $("#sortByCost").click(() => sortAndShowProducts(ORDER_BY_PROD_COST));

    $("#clearRangeFilter").click(() => {
        $("#rangeFilterCostMin").val("");
        $("#rangeFilterCostMax").val("");

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    $("#rangeFilterCost").click(() => {

        minCost = $("#rangeFilterCostMin").val();
        maxCost = $("#rangeFilterCostMax").val();

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });