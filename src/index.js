document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4208

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
 
  fetch(imageURL)
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    console.log(object)

    const name = document.querySelector('#name')
    const img = document.querySelector('#image')
    const likes = document.querySelector('#likes')
    const ulTag = document.querySelector('#comments')

    name.innerText = object.name
    img.src = object.url
    likes.innerText = object.like_count

    const likeButton = document.querySelector('#like_button')
    likeButton.addEventListener('click', function(){
      likes.innerText = parseInt(object.like_count) + 1
      object.like_count += 1
      
      fetch(likeURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: imageId
        })
      })
    })

    object.comments.forEach(function(comment){
      liTag = document.createElement('li')
      deleteButton = document.createElement('button')
      liTag.innerText = comment.content
      ulTag.append(liTag)
      liTag.append(deleteButton)

    })

    const form = document.getElementById('comment_form')
    let formInput = form[0]
    let formSubmitButton = form[1]
    formSubmitButton.addEventListener('click', function(e){
      e.preventDefault()
      console.log("clicked!")
      let newComment = document.createElement('li')
      newComment.innerText = formInput.value
      ulTag.append(newComment)

      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: imageId,
          content: formInput.value
        })
      })
      form.reset()
    })
  })
})
