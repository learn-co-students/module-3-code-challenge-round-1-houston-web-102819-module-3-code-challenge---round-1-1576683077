document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4207 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch("https://randopic.herokuapp.com/images/4207")
    .then(function (response) {
      return response.json()
    })
    .then(function (body) {
      let image = document.getElementById("image")
      image.src = body.url
      let name = document.getElementById("name")
      name.innerText = body.name
      let likes = document.getElementById("likes")
      likes.innerText = body.like_count
      let comments = body.comments
      let ul = document.getElementById("comments")
      comments.forEach(function (comment) {
        let li = document.createElement("li")
        li.innerText = comment.content
        ul.append(li)
      })
      let likeButton = document.getElementById("like_button")
      likeButton.addEventListener("click", function (e) {
        // let count = 0
        // count += 1
        likes.innerText = parseInt(likes.innerText) + 1
        fetch('https://randopic.herokuapp.com/likes', {
          method: "POST",
          body: JSON.stringify({
            "image_id": imageId
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      })
      let comment = document.getElementById("comment_input")
      let submit = document.querySelector("input")
      let form = document.getElementById("comment_form")
      form.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(comment.value)
      })
    })

})
