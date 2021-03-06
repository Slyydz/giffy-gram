export const NavBar = () => {
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img id="homeImg" src="./src/images/bottle.png" alt="Giffygram icon" />
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            <div class="navigation__item navigation__search">
                <input type="text" id="postSearch" placeholder="Search posts..." />
            </div>

            <div class="navigation__item navigation__addPost">
                <button id="addPost" class="addPostButton">Add Post</button>
            </div>

            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="./src/images/fountain-pen.svg" alt="Direct message" />
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
    `
}