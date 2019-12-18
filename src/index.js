document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4204

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(function(response){
    return response.json()
  })
  .then(function(response){
    changeDOM(response, likeURL, commentsURL)
  })
})

function changeDOM(image, likeURL, commentsURL){
  const mainImage = document.getElementById("image")
  const imageName = document.getElementById("name")
  const imageLikes = document.getElementById("likes")

  mainImage.src = image.url
  imageName.innerText = image.name
  imageLikes.innerText = image.like_count

  showComments(image, commentsURL)
  likeFunctionality(image, imageLikes, likeURL)
}

function showComments(image, commentsURL){
  const commentPlaceholder = document.getElementById("comments")
  for (comment of image.comments){
    const li = document.createElement("li")
    const deleteButton = document.createElement("button")

    li.innerText = `${comment.content}`
    deleteButton.innerText = "Delete"

    li.append(deleteButton)
    commentPlaceholder.append(li)
    

    deleteComment(comment, li, deleteButton, commentsURL)
  }
  addComments(image, commentPlaceholder, commentsURL)
}

function likeFunctionality(image, likes, likeURL){
  const likeButton = document.getElementById("like_button")
console.log(image)
  likeButton.addEventListener("click", function(){
    likes.innerText = parseInt(likes.innerText) + 1

    console.log(image.id)
    fetch(likeURL, {
      method: "POST",
      body: JSON.stringify({
        "image": image,
        "image_id": image.id,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(result){
      return result.json()
    }).then(console.log)
  })
}

function addComments(image, commentPlaceholder, commentsURL){
  const commentForm = document.getElementById("comment_form")

  console.log(commentsURL)
  commentForm.addEventListener("submit", function(e){
    e.preventDefault()

    const commentValue = e.target.elements[0].value
    const li = document.createElement("li")
    li.innerText = commentValue
    commentPlaceholder.append(li)

    fetch(commentsURL, {
      method: "POST",
      body: JSON.stringify({
        image_id: image.id,
        content: commentValue
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  })
}

function deleteComment(comment, commentLi, deleteButton, commentsURL){
  deleteButton.addEventListener("click", function(){
    commentLi.remove()

    fetch(`${commentsURL}/${comment.id}`,{
      method: "DELETE",
      body: JSON.stringify({
        comment_id: comment.id
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(function(response){
      return response.json()
    }).then(console.log)
  })
}

