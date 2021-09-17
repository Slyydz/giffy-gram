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
        <p class="userId">User Id: ${postObject.userId}</p> 
        <div><button id="edit--${postObject.id}">Edit</button></div> <div><button id="delete--${postObject.id}">Delete</button></div>
      </section>
    `
  }