export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
        <div class="footerButtons"> 
        <button id="filterUser">Show your posts</button>
        <button id="filterAll">Show all posts</button>
        </div>
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount"></span>
            </div>
            <p> &copy Nashville Software School 2021</p>
        </footer>
    `
}