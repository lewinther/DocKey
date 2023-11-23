


// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// START - CREATE NEW USER
const User = Parse.Object.extend("_User");
const user = new User();

// Create dummy user id for testing queries
user.set("dock", "P1");
user.set("username", "Mealz");
user.set("email", "alex.mealzy@cbs.dk");
user.set("phone_no", "12345678");
user.set("active_user", true);
user.set("password", "1234");

user.save().then(
	(userObject) => {
		console.log("saved with id: " + userObject.id);
}, (error) => {
	console.log(error.message);
})
// END - CREATE NEW USER


// START - CREATE NEW MESSAGE
const createMessage = async function(senderId, receiverId, messageText) {
	try {
	  // Create a new Parse Object instance for the Message class
	  let Message = new Parse.Object('Message');
  
	  // Set the message text
	  Message.set('Message_Text', messageText);
  
	  // Set the message date to the current date and time
	  Message.set('Message_Date', new Date());
  
	  // Create pointers to the sender and receiver User objects
	  let senderPointer = Parse.Object.extend('_User').createWithoutData(senderId);
	  let receiverPointer = Parse.Object.extend('_User').createWithoutData(receiverId);
  
	  // Set the sender and receiver pointers
	  Message.set('Sender_User_ID', senderPointer);
	  Message.set('Receiver_User_ID', receiverPointer);
  
	  // Save the message to Back4App
	  await Message.save();
	  console.log('Message sent successfully!');
	} catch (error) {
	  console.error('Error sending message:', error.message);
	}
  };
  
  // Example usage
  const senderId = 'YznbDiMrX1';
  const receiverId = 'J10urHWKQJ';
  
  // Send a dummy message from sender to receiver
  createMessage(senderId, receiverId, 'Please help me! I am sinking!!!');
  
  // Send a dummy message from receiver to sender
  createMessage(receiverId, senderId, 'Sorry, I am busy right now.');

// END - CREATE NEW MESSAGE


// START - CREATE NEW NEWS
// Function to create a sample news article
const createSampleNewsArticle = async (title, text, date, imgURL) => {
	const NewsArticle = Parse.Object.extend("News");
	const newsArticle = new NewsArticle();
  
	newsArticle.set("News_Title", title);
	newsArticle.set("News_Text", text);
	newsArticle.set("News_Date", date); // Assuming date is a string or a Date object
	newsArticle.set("News_Img", imgURL);
  
	try {
	  let result = await newsArticle.save();
	  console.log('News Article created', result);
	} catch (error) {
	  console.error('Error while creating News Article: ', error);
	}
  };
  
  // Sample news articles about a harbor community
  createSampleNewsArticle(
	"Harbor Festival Kicks Off This Weekend", 
	"The annual Harbor Festival is back, promising a weekend of fun, food, and festivities for families. Highlights include boat races, local seafood stalls, and live music.", 
	new Date()
  );
  
  createSampleNewsArticle(
	"New Marine Conservation Initiative Launched", 
	"A new initiative aimed at preserving the marine ecosystem has been launched by the harbor community. The project focuses on sustainable fishing and protecting marine wildlife.", 
	new Date()
  );
  
  createSampleNewsArticle(
	"Community Meeting to Discuss Waterfront Development", 
	"Residents are invited to a community meeting next Thursday to discuss the proposed development plans for the waterfront area. The meeting aims to gather feedback and suggestions from the community.", 
	new Date()
  );
// END - CREATE NEW NEWS