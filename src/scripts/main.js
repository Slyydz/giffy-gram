// Can you explain what is being imported here?
import { getUsers, getPosts } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/footer.js";
import { usePostCollection } from "./data/DataManager.js";
import { usePostLength } from "./data/DataManager.js";
import { PostEntry } from "./feed/PostEntry.js";
import { createPost } from "./data/DataManager.js";

//Show Post Data in List
const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}


//Show Nav Bar
const showNavBar = () => {
	const navElement = document.querySelector(".nav");
	navElement.innerHTML = NavBar();
}

//Show Footer
const showFooter = () => {
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

//Button Declartaion Start
const applicationElement = document.querySelector(".giffygram");

//Button for Logout
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		console.log("Logout")
	}
})

//Button for Year Change
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
		const yearAsNumber = parseInt(event.target.value)

		console.log(yearAsNumber)
		showFilteredPosts(yearAsNumber);
	}
})

//Button to filter by year
const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
		if (singlePost.timestamp >= epoch) {
			return singlePost
		}
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
	document.getElementById("postCount").innerHTML = `${filteredData.length} posts since ${year}`;
}

//Button for DM Icon
applicationElement.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon") {
		console.log("dm");
	}
})

//Button for Home Icon
applicationElement.addEventListener("click", event => {
	if (event.target.id === "homeImg") {
		console.log("home");
	}
})

//Button for Editing Posts
applicationElement.addEventListener("click", (event) => {
	if (event.target.id.startsWith("edit")) {
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

//Button and Etc for adding Post
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		document.querySelector("input[name='postTitle']").value = "";
		document.querySelector("input[name='postURL']").value = "";
		document.querySelector("textarea[name='postDescription']").value = "";
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
		//collect the input values into an object to post to the DB
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		//we have not created a user yet - for now, we will hard code `1`.
		//we can add the current time as well
		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: 1,
			timestamp: Date.now()
		}

		// be sure to import from the DataManager
		createPost(postObject)
		window.location.reload();
	}
})

const showPostEntry = () => {
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}

//Start 
const startGiffyGram = () => {
	showNavBar();
	showPostList();
	showFooter();
	showPostEntry();
}

//invoke start
startGiffyGram();




