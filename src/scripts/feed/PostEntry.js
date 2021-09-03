export const PostEntry = () => {
    return `
    <div class="newPost">
    <h2 class="postHeader">Create a new post!</h2>
        <div>
            <input value=""
                   name="postTitle"
                   class="newPost__input"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value=""
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>

        <textarea name="postDescription"
            class="newPost__input newPost__description"
            placeholder="Story behind your gif..."></textarea>
        <div>
            <button id="newPost__submit">Save</button>
            <button id="newPost__cancel">Cancel</button>
        </div>
    </div>
    `
}