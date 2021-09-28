fetch(PRODUCT_INFO_URL)
    .then(res => res.json())
    .then(data => {
            // console.log(data)
            let qty = data.images.length


            let imgHtml = `<div class="carousel-item active">
        <img class="d-block w-100" src=${data.images[0]} alt="slide">
      </div>`
            for (let i = 1; i < qty; i++) {
                imgHtml += `<div class="carousel-item">
            <img class="d-block w-100" src=${data.images[i]} alt="slide">
          </div>`

            }
            $(".carousel-inner").eq(0).html(imgHtml)


            let imgIndicators = `<li data-target="#carouselExampleIndicators" data-slide-to=${0} class="active"></li>`
            for (let i = 1; i < qty; i++) {
                imgIndicators += `<li data-target="#carouselExampleIndicators" data-slide-to=${i}></li>`
            
            $(".carousel-indicators").eq(0).html(imgIndicators)

        }

        $("#titulo-producto").html(data.name)
        $("#product-description").html(data.description)
        $("#product-count").html(data.soldCount)
        $("#product-price").html(`${data.currency} ${data.cost}`)


        $("#productImagesGallery > img").click((event) => {
            $('#overlay')
                .css({
                    backgroundImage: `
                url($ {
                    event.target.src
                })
                `
                })
                .addClass('open')
                .one('click', function () {
                    $(this).removeClass('open');
                });
        })
            
    let relatedImgs = []

    data.relatedProducts.forEach(thing => relatedImgs.push(thing))

    fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data2 => {

        relatedImgs.forEach(thing => {

                $("#productImagesGallery").append(`
                    <img src=${data2[thing].imgSrc} onclick='window.location.href = "product-info.html"'>
                `)

        })
    })
    })



var addComment = (name, score, comment, date) => {

    let commentCard = ` <div class="comment-card container"><h4>${name} &nbsp; <span class="small"> ${date} </span></h4>`

    for (let i = 0; i < 5; i++) {
        if (i < score) {
            commentCard += ` <span class="fa fa-star checked"> </span>`
            } else {
                commentCard += `<span class="fa fa-star"></span>`
            }
        }

        commentCard += `<p>${comment}</p></div>`


        $(".comments-box").append(commentCard)
    }

// Carga de todos los comentarios
fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        data.forEach(comment => {
            addComment(comment.user, comment.score, comment.description, comment.dateTime)
        })
    })


// Boton de publicar comentarios
var publishComment = () => {
    let score = $("input[name='rating']:checked").val()
    let comment = $("textarea").val()
    let date = new Date()

    let finalDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}`

    addComment(sessionStorage.getItem('user'), score, comment, finalDate)
    $("input[name='rating']:checked").prop('checked', false);
    $("textarea").val("")
}

$(".comment-card button").click(publishComment)