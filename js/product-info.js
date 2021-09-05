fetch(PRODUCT_INFO_URL)
    .then(res => res.json())
    .then(data => {
        // console.log(data)

        $("#product-img").attr("src", data.images[0])
        $("#titulo-producto").html(data.name)
        $("#product-description").html(data.description)
        $("#product-count").html(data.soldCount)
        $("#product-price").html(data.currency + " " + data.cost)


        data.images.forEach(image => {

            if (image != data.images[0]) {
                $("#productImagesGallery").append(`
            <img src="${image}">
            `)
            }
        })

        $("#productImagesGallery > img").click((event) => {
            $('#overlay')
                .css({
                    backgroundImage: `url(${event.target.src})`
                })
                .addClass('open')
                .one('click', function () {
                    $(this).removeClass('open');
                });
        })
    })



var addComment = (name, score, comment, date) => {

    let commentCard = `<div class="comment-card container"><h4>${name} &nbsp; <span class="small">${date}</span></h4>`

    for (let i = 0; i < 5; i++) {
        if (i < score) {
            commentCard += `<span class="fa fa-star checked "></span>`
        } else {
            commentCard += `<span class="fa fa-star "></span>`
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

    let finalDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}`

    addComment(sessionStorage.getItem('user'), score, comment, finalDate)
}

$(".comment-card button").click(publishComment)

