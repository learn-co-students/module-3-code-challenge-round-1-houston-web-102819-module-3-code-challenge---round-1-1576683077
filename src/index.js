document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4203 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${4203}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(function (response){
      return response.json()
  })
    .then(function(page){
      renderPage(page)
  })



  let name = document.querySelector(`#name`)
  let likes = document.querySelector(`#likes`)
  let image = document.querySelector(`#image`)
  let comment = document.querySelector(`#comments`)
  let likeButton = document.querySelector(`#like_button`)


  likeButton.addEventListener("click", function(){
      likes.innerText++

      fetch(`https://randopic.herokuapp.com/likes`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }    ,
        body: JSON.stringify({
          image_id:(4203)

      })
    })
  })

const renderPage = function(page) {
  console.log(page)

  

  image.setAttribute("src", page.url)
  name.append(page.name)
  likes.append(page.like_count)
  comment.append(page.comments)


  let commentsPage = ""
  page.comments.forEach(function (comments){
    commentsPage = commentsPage + comments.content

  })
  comment.innerText = commentsPage + " "

    }
 })
