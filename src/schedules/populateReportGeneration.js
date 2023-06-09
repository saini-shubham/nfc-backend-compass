const cron = require("node-cron");
const Tag = require("../models/tag");
const TagReport = require("../models/tagReport");
// Source and target collection names
const sourceCollectionName = "sourceCollection";
const targetCollectionName = "targetCollection";

// Function to populate the source collection
const populateSourceCollection = async () => {
  try {
	console.log("starting populating")
    //const currentDate = new Date(); // Get the student IDs and current date from the target collection
    //const targetCollection = db.collection(targetCollectionName);
   // const tags = await Tag.find({}).toArray(); // Populate the source collection with student IDs and current date
    const tags = await Tag.find({}); // Populate the source collection with student IDs and current date
    //console.log(tags)
    //const sourceCollection = db.collection(sourceCollectionName);
    //await sourceCollection.deleteMany({}); // Remove existing data from the source collection
const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Month index starts from 0, so we add 1
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

//console.log(formattedDate);
const insertSetWithDate = tags.map((tag)=>({
	tagId: tag.tagId,
        name: tag.name,
        houseNo: tag.houseNo,
        locality: tag.locality,
        city: tag.city,
     scanned: false,
        //date: presentDate,
        date: formattedDate,
	//date: new Date().toLocaleDateString()
	}))
	console.log(insertSetWithDate)
	const res= await TagReport.insertMany(insertSetWithDate)

    //await TagReport.insertMany(
     // tags.map((tag) => ({
       // tagId: tag.tagId,
        //name: tag.name,
        //houseNo: tag.houseNo,
       // locality: tag.locality,
       // city: tag.city,
        //scanned: false,
        //date: presentDate,
        //date: new Date().toLocaleDateString(),
        //time: presentTime,     // }))
   // ); // Disconnect from MongoDB

   // await client.close();

    console.log("Source collection populated successfully.",res);
  } catch (error) {
    console.error("Error populating source collection:", error);
  }
};

// Schedule the cron job to run every day at 1 am
cron.schedule("0 1 * * *", populateSourceCollection); //every day at 1am
//cron.schedule("0 1 * * *", populateSourceCollection);
//cron.schedule("* * * * *", populateSourceCollection); //for every sec

console.log("Cron job scheduled to run every day at 1 am.");

module.exports = cron;
