const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://server/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for the collection
const customerOrderDetailSchema = new mongoose.Schema({
  customerOrderNumber: String,
  isActive: Boolean,
});

// Define the model for the collection
const CustomerOrderDetail = mongoose.model('collection', customerOrderDetailSchema);

// Define the IDs of the documents to fetch
const documentIds = [
  '644412d65323d358a768aa1c',
  '6444138d5323d30fba68aa2b',
  '644413115323d386ae68aa21',
  '6444120c5323d37fd668aa0d',
  '644413515323d373d868aa26',
  '6444129c5323d3253768aa17',
  '6444124a5323d31e6f68aa12',
  '644411c45323d38dd268aa08',
];
//{customerOrderNumber:'0010020186',isActive: true}

// Fetch the documents in parallel
const t1 = new Date().getTime();
Promise.all(documentIds.map((id) => CustomerOrderDetail.findOne({_id: id}).exec()))

  //CustomerOrderDetail.find({customerOrderNumber: '0010020186', isActive: true})
  //.exec()
  .then((documents) => {
    const t2 = new Date().getTime();
    console.log('time taken ' + (t2 - t1) / 1000);
    console.log(JSON.stringify(documents).length / 1024 / 1024);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    // Disconnect from MongoDB
    mongoose.disconnect();
  });
