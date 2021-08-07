var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        console.log(product)

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <br><p class="text-muted">` + product.description +` </p>
                </div>
                
            </div>
        </div>
        `

        document.getElementById("products-list").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner()
    
    setTimeout(() =>getJSONData(PRODUCTS_URL)
    .then(response => {
        if (response.status === "ok")
        {
            productsArray = response.data;

            showProductsList(productsArray);
            console.log(productsArray)
        }
    })
    ,500)
});