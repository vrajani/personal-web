// Initialize the App Client
const client = stitch.Stitch.initializeDefaultAppClient("stitch-app-wwjib");
// Get a MongoDB Service Client
const mongodb = client.getServiceClient(
	stitch.RemoteMongoClient.factory,
	"mongodb-atlas"
);
// Get a reference to the blog database
const db = mongodb.db("blog");

function displayContents() {
	db.collection("contents")
		.find({"key":"skills"}, { limit: 1 })
		.then(docs => {
			const html = docs.map(doc => `<div>${doc.comment}</div>`);
			document.getElementById("comments").innerHTML = html;
		})
}

function displayContentsOnLoad() {
	client.auth
		.loginWithCredential(new stitch.AnonymousCredential())
		.then(displayContents)
		.catch(console.error);
}

function addComment() {
	const newComment = document.getElementById("new_comment");
	console.log("add comment", client.auth.user.id)
	db.collection("comments")
		.insertOne({ owner_id: client.auth.user.id, comment: newComment.value })
		.then(displayComments);
	newComment.value = "";
}
