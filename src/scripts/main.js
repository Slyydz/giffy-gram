// Can you explain what is being imported here?
import { getUsers, getPosts, deletePost, getSinglePost, loginUser, registerUser, postLike, deleteLike, getPostsByUser, getLikes, getLikesByAuthor } from "./data/DataManager.js"
import { PostList, PostListEdit } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/footer.js";
import { usePostCollection } from "./data/DataManager.js";
import { usePostLength } from "./data/DataManager.js";
import { PostEntry } from "./feed/PostEntry.js";
import { createPost } from "./data/DataManager.js";
import { PostEdit } from "./feed/Post.js";
import { getLoggedInUser } from "./data/DataManager.js";
import { updatePost } from "./data/DataManager.js";
import { setLoggedInUser } from "./data/DataManager.js";
import { LoginForm, RegisterForm } from "../auth/Forms.js";
//Show Post Data in List
const postElement = document.querySelector(".postList");
const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const sessionUser = JSON.parse(sessionStorage.getItem("user"));
	let edit = [];
	let noEdit = [];
	let alreadyLiked = [];
	getPosts().then((allPosts) => {
		for (let count = 0; count < allPosts.length; count++) {
			if (sessionUser.name === allPosts[count].user.name) {
				edit.push(allPosts[count]);
			} else {
				noEdit.push(allPosts[count]);
			}
		}
		getLikesByAuthor(sessionUser.id).then(response => {
			console.log(response);
		})

		postElement.innerHTML = PostListEdit(edit);
		postElement.innerHTML += PostList(noEdit);
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

//Display Edit Info
const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
}

//Button for Editing Posts
applicationElement.addEventListener("click", (event) => {
	if (event.target.id.startsWith("edit")) {
		const postId = event.target.id.split("--")[1];
		console.log("the id is", event.target.id.split("--")[1])
		getSinglePost(postId)
			.then(response => {
				showEdit(response);
			})
		window.scrollTo(0, 0);
	}
})

//Update Button for Edit
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
		const postId = event.target.id.split("__")[1];
		//collect all the details into an object
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		const timestamp = document.querySelector("input[name='postTime']").value

		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: parseInt(timestamp),
			id: parseInt(postId)
		}

		updatePost(postObject)
			.then(response => {
				showPostList();
				showPostEntry();
			})
	}
})

//Delete Button
applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("delete")) {
		const getId = event.target.id.split("--", 6);
		console.log(getId[1]);
		deletePost(getId[1]).then(taco => { showPostList() });
	}
})

//Button and Etc for adding Post
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		showPostEntry();
	}
})

//New Post Submit Button
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
			userId: getLoggedInUser().id,
			timestamp: Date.now()
		}

		// be sure to import from the DataManager
		createPost(postObject).then(Response => showPostList());
		document.querySelector("input[name='postTitle']").value = "";
		document.querySelector("input[name='postURL']").value = "";
		document.querySelector("textarea[name='postDescription']").value = "";
	}
})

//Show Entry
const showPostEntry = () => {
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
	document.querySelector("input[name='postTitle']").value = "";
	document.querySelector("input[name='postURL']").value = "";
	document.querySelector("textarea[name='postDescription']").value = "";
}

//Start 
const startGiffyGram = () => {
	showNavBar();
	showPostList();
	showFooter();
	showPostEntry();
}

//Check If User is logged in
const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")))
		startGiffyGram();
	} else {
		showLogIn();
	}
}

const showLogIn = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");

	entryElement.innerHTML = `${LoginForm()} <hr/><hr/> ${RegisterForm()}`

	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}

//Login button
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id == "login__submit") {
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value,
		}

		loginUser(userObject)
			.then(dbUserObject => {
				if (dbUserObject) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObject));
					startGiffyGram();
				} else {
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = '<p class="center">That user does not exist. Try again or register for an account</p>'
				}
			})
	}
})

//Register Button
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			dateJoined: Date.now()
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startGiffyGram();
			})
	}
})

//Logout Button
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		//   logoutUser();
		console.log(getLoggedInUser());
		sessionStorage.clear();
		checkForUser();
	}
})

//Like Button
applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("like")) {
		const postId = parseInt(event.target.id.split("__")[1]);
		const likeObject = {
			postId: postId,
			userId: getLoggedInUser().id
		}
		postLike(likeObject)
			.then(response => {
				showPostList();
			})

	}

})

//Unlike
applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("unlike")) {
		const postId = parseInt(event.target.id.split("__")[1]);

		const likeObject = {
			postId: postId,
			userId: getLoggedInUser().id
		}

		getLikesByAuthor(getLoggedInUser().id).then(response => {
			 for (let count of response) {
				if (count.postId == postId) {
					deleteLike(count.id)
						.then(response => {
							showPostList();
						})
				}
			 }
		}
		)
	}

})


//filter functions
applicationElement.addEventListener("click", event => {
	if (event.target.id == "filterUser") {
		const filterByUser = getPostsByUser(getLoggedInUser().id).then(response => {
			postElement.innerHTML = PostListEdit(response);
		})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id == "filterAll") {
		showPostList();
	}
})

checkForUser();




