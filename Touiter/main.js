// APPEL API
const urlApi = "https://touiteur.cefim-formation.org/"
const containerPost = document.querySelector("#container-post");

// get all tweets function
async function getAllTweets() {
    try {
        const response = await fetch(urlApi + "list");
        const data = await response.json();
        // return console.log(data);
        // Reverse the tweet messages array and get the last 30 tweets
        const lastTweets = data.messages.reverse().slice(0, 15);

        // Loop through the last 30 tweets and extract the tweet properties
        for (let i = 0; i < lastTweets.length; i++) {
            const tweet = lastTweets[i];

            // Extract the tweet properties
            // const id = tweet.id;
            const name = tweet.name;
            const message = tweet.message;
            // const ts = tweet.ts;
            const likes = tweet.likes;
            const comments_count = tweet.comments_count;
            // const ip = tweet.ip;

            // creation div "post" + ajout de class + afficher dans le DOM, dans le containerPost
            var newPost = document.createElement("div");
            newPost.className = "post";
            containerPost.appendChild(newPost);

            // creation h3 + ajout pseudo/name + afficher dans le DOM, dans le containerPost créé juste avant
            var newPseudo = document.createElement("h3");
            newPseudo.textContent = name;
            newPost.appendChild(newPseudo);

            // creation p + ajout message + afficher dans le DOM, dans le containerPost
            var newMessage = document.createElement("p");
            newMessage.textContent = message;
            newPost.appendChild(newMessage);

            // creation div + ajout class + afficher dans le DOM, dans le containerPost
            var newSet = document.createElement("div");
            newSet.className = "interaction-set";
            newPost.appendChild(newSet);

            // creation div + ajout class + afficher dans le DOM, dans newSet
            var newComment = document.createElement("div");
            newComment.className = "comment";
            if (comments_count === 0 || comments_count === 0) {
                newComment.textContent = comments_count + " commentaire";
            }

            else {
                newComment.textContent = comments_count + " commentaires";
            }
            newSet.appendChild(newComment);

            // creation div + ajout class + afficher dans le DOM, dans le newSet
            var newSetLike = document.createElement("div");
            newSetLike.className = "interaction-like";
            newSet.appendChild(newSetLike);

            // creation div + ajout class + afficher dans le DOM, dans le newSetLike
            var comptLike = document.createElement("div");
            comptLike.className = "like";
            comptLike.textContent = likes;
            newSetLike.appendChild(comptLike);

            // creation img + ajout class + afficher dans le DOM, dans newSet
            var newLike = document.createElement("img");
            newLike.id = "button-like";
            newLike.setAttribute("src", "img/likeBorder.svg")
            newLike.setAttribute("alt", "bouton like")
            newSetLike.appendChild(newLike);

            newLike.addEventListener('click', function () {
                if (newLike.src.match(/likeBorder.svg/)) {
                    console.log("ok")
                    newLike.src = "img/like.svg";
                    newUnlike.src = "img/unlikeBorder.svg";
                    addLike();

                }
                else {
                    console.log("pas ok")
                    newLike.src = "img/likeBorder.svg";
                    removeLike();
                }
            });



            // creation img + ajout class + afficher dans le DOM, dans newSet
            var newUnlike = document.createElement("img");
            newUnlike.id = "button-unlike";
            newUnlike.setAttribute("src", "img/unlikeBorder.svg")
            newUnlike.setAttribute("alt", "bouton unlike")
            newSetLike.appendChild(newUnlike);

            newUnlike.addEventListener('click', function () {
                if (newUnlike.src.match(/unlikeBorder.svg/)) {
                    console.log("ok")
                    newUnlike.src = "img/unlike.svg";
                    newLike.src = "img/likeBorder.svg";
                    removeLike();
                }
                else {
                    console.log("pas ok")
                    newUnlike.src = "img/unlikeBorder.svg";
                    addLike();
                }
            });

        }

    } catch (error) {
        return console.log(error);
    }
}

getAllTweets();



function addLike() {
    fetch(urlApi + "likes/send", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "likes=" + encodeURIComponent(+ 1)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function removeLike() {
    fetch(urlApi + "likes/send", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "likes=" + encodeURIComponent(- 1)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}










function postTweet(name, message) {
    fetch(urlApi + "send", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(message)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}



const pseudoInput = document.querySelector("#pseudo-input");
const messageInput = document.querySelector("#message-input");
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    postTweet(pseudoInput.value, messageInput.value);
    location.reload();
});










// // FUNCION AJOUTER UN TOUIT
// const pseudoInput = document.querySelector("#pseudo-input");
// const messageInput = document.querySelector("#message-input");
// const form = document.querySelector('form');

// function addPost() {
//     // creation div "post" + ajout de class + afficher dans le DOM, dans le containerPost
//     var newPost = document.createElement("div");
//     newPost.className = "post";
//     containerPost.appendChild(newPost);

//     // creation h3 + ajout texte input + afficher dans le DOM, dans le containerPost créé juste avant
//     var newPseudo = document.createElement("h3");
//     newPseudo.textContent = pseudoInput.value;
//     newPost.appendChild(newPseudo);

//     // creation p + ajout text input + afficher dans le DOM, dans le containerPost
//     var newMessage = document.createElement("p");
//     newMessage.textContent = messageInput.value;
//     newPost.appendChild(newMessage);

//     // creation div + ajout class + afficher dans le DOM, dans le containerPost
//     var newSet = document.createElement("div");
//     newSet.className = "interaction-set";
//     newPost.appendChild(newSet);

//     // creation div + ajout class + afficher dans le DOM, dans newSet
//     var newComment = document.createElement("div");
//     newComment.className = "comment";
//     newComment.textContent = "0 commentaire";
//     newSet.appendChild(newComment);

//     // creation img + ajout class + afficher dans le DOM, dans newSet
//     var newLike = document.createElement("img");
//     newLike.className = "like";
//     newLike.id = "button-like";
//     newLike.setAttribute("src", "img/likeBorder.svg")
//     newLike.setAttribute("alt", "bouton like")
//     newSet.appendChild(newLike);

//     newLike.addEventListener('click', function () {
//         if (newLike.src.match(/likeBorder.svg/)) {
//             newLike.src = "img/like.svg"
//         }

//         else {
//             newLike.src = "img/likeBorder.svg"
//         }
//     });
// }

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     addPost();
// });