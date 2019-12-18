document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4205

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageCard = document.querySelector("image_card")

  fetch(imageURL)
    .then(function (response) {
      return response.json()
    }).then(function (id) {
      console.log(id.comments)
      let imageSelect = document.getElementById("image")
      imageSelect.setAttribute('src', id.url)

      let imageName = document.getElementById("name")
      imageName.innerHTML = id.name

      let numberOfLikes = document.getElementById("likes")
      numberOfLikes.innerHTML = id.like_count



      let imageComments = document.getElementById("comments")
      id.comments.forEach(function (comment) {
        let firstComment = comment.content
        imageComments.innerHTML = firstComment
      })
      button = document.getElementById("like_button")
      button.addEventListener('click',function(){
      likeButton = document.getElementById("likes")
      likeButton.innerHTML++
      fetch(likeURL, {
        method: 'POST',
        body: JSON.stringify({
          image_id: 4205
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      commentsUL = document.getElementById("comments")
      createLi = document.createElement("li")
      createLi.forEach(function(comments)



      })


      



      


      


    })


})
