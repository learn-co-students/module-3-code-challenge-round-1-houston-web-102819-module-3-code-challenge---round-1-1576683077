document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4206 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
    .then(function(response){
      return response.json()
    }).then(function(image){
      
      let imageTag = document.getElementById('image')
      imageTag.setAttribute('src', image.url)

      let imageName = document.getElementById('name')
      imageName.innerText = image.name

      let likes = document.getElementById('likes')
      likes.innerText = image.like_count

      let commentsList = document.getElementById('comments')
      image.comments.forEach(function(comment){
        let commentListItem = document.createElement('li')
        commentListItem.innerText = comment.content
        commentsList.append(commentListItem)
      })

      let likeBtn = document.getElementById('like_button')
      likeBtn.addEventListener('click', function(e){
        likes.innerText = parseInt(likes.innerText) + 1

        fetch(likeURL, {
          method: 'POST',
          body: JSON.stringify({
            image_id: imageId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      })

      document.addEventListener('submit', function(e){
        e.preventDefault()

        let commentInput = document.getElementById('comment_input')
        let commentsList = document.getElementById('comments')
        let commentListItem = document.createElement('li')
        commentListItem.innerText = commentInput.value
        commentsList.append(commentListItem)

        fetch(commentsURL, {
          method: 'POST',
          body: JSON.stringify({
            image_id: imageId,
            content: commentInput.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        commentInput.value = ''
      })
    })
  

})
