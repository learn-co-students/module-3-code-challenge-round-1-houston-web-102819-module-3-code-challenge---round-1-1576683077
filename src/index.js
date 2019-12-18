document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 1; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${4209}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;
});

fetch(`https://randopic.herokuapp.com/images/${4209}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(image) {
    console.log(image);
    const imageCard = document.querySelector("#image_card");
    const imageTitle = document.querySelector("#name");

    imageTitle.innerHTML = image.name;

    const imagePicture = document.querySelector("#image");
    imagePicture.src = image.url;

    const imageLikes = document.querySelector("#likes");
    imageLikes.innerHTML = image.like_count;

    let imageCommentsUl = document.querySelector("#comments");
    let imageCommentsLi = document.createElement("li");

    image.comments.forEach(function(comments) {
      imageCommentsList = image.comments;

      imageCommentsLi.innerHTML = comments.content;

      imageCommentsUl.append(imageCommentsLi);
    });

    const likeButton = document.querySelector("#like_button");

    likeButton.addEventListener("click", function(e) {
      console.log("i was clicked");
      image.like_count = image.like_count + 1;
      imageLikes.innerHTML = image.like_count;
      fetch("https://randopic.herokuapp.com/likes", {
        method: "POST",

        body: JSON.stringify({
          image_id: 4209
        }),

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    });


  const commentForm = document.querySelector("#comment_form")


  // commentForm.addEventListener("submit",function(e) {
  //   e.preventDefault()
  //   console.log(e)

    // image.comments.push
    // imageCommentsLi.innerHTML = comments.content;
    // imageCommentsUl.append(imageCommentsLi);


    // fetch("https://randopic.herokuapp.com/comments", {
    //     method: "POST",

    //     body: JSON.stringify({
    //       image_id: 4209,
    //       content: comments.content
    //     }),

    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     }
    //   });

    // })






    // imageCard.append(imageTitle,imagePicture,imageLikes)
  });
