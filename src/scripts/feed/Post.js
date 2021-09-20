import { getLikes } from "../data/DataManager.js";

const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}

export const Post = (postObject) => {
    const dateObj = new Date(postObject.timestamp);
    const formattedDate = dateObj.toDateString();
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <h3 class="description">${postObject.description}</h3>
        <h4 class="userName">${postObject.user.name}</h4>
        <p class="timestamp">${formattedDate}</p>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <div><button id="like__${postObject.id}">Like</button></div>
      </section>
    `
  }

  export const PostWithControls = (postObject) => {
    const dateObj = new Date(postObject.timestamp);
    const formattedDate = dateObj.toDateString();
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <h3 class="description">${postObject.description}</h3>
        <h4 class="userName">${postObject.user.name}</h4>
        <p class="timestamp">${formattedDate}</p>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <div><button id="edit--${postObject.id}">Edit</button></div>
        <div><button id="delete--${postObject.id}">Delete</button></div>
      </section>
    `
  }

  export const PostEdit = (postObj) => {
    return `
    <div class="newPost">
    <h3>Edit This Post</h3>
      <div>
        <input value="${postObj.title}"
             name="postTitle"
             class="newPost__input"
             type="text"
             placeholder="Title" />
      </div>
      <div>
        <input value="${postObj.imageURL}"
             name="postURL"
             class="newPost__input"
             type="text"
             placeholder="URL of gif" />
      </div>
  
        <textarea name="postDescription"
        class="newPost__input newPost__description"
        placeholder="Story behind your gif...">${postObj.description}</textarea>
      
      <input type="hidden" value="${postObj.id}" name="postId">
      <input type="hidden" value="${postObj.timestamp}" name="postTime">	
      <button id="updatePost__${postObj.id}">Update</button>
      <button id="newPost__cancel">Cancel</button>
    </div>
    `
  }

