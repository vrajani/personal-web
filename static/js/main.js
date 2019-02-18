// Initialize the App Client
const client = stitch.Stitch.initializeDefaultAppClient("stitch-app-wwjib");
// Get a MongoDB Service Client
const mongodb = client.getServiceClient(
	stitch.RemoteMongoClient.factory,
	"mongodb-atlas"
);
// Get a reference to the blog database
const db = mongodb.db("profile");

function displayConfirmation() {
	const confirmation = document.getElementById("confirmation");
	const html = `<div>Your message was successfully received! Have a nice day!</div>`;
	confirmation.innerHTML = html;

}

function addContact() {
	const firstName = document.getElementById("first_name");
	const lastName = document.getElementById("last_name");
	const email = document.getElementById("contact_email");
	const phone = document.getElementById("contact_phone");
	const reason = document.getElementById("reason");
	const companyName = document.getElementById("company_name");

	console.log("add contact", client.auth.user.id)
	displayConfirmation();
	db.collection("contacts")
		.insertOne({
			owner_id: client.auth.user.id,
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			phone: phone.value,
			reason: phone.reason,
			companyName: phone.companyName,
			dateTime : Date.now()
		})
		.then(displayConfirmation);
	firstName.value = "";
	lastName.value = "";
	email.value = "";
	phone.value = "";
	reason.value = "";
	companyName.value = "";}
