const mongoose = require('mongoose');

const saDocSchema = new mongoose.Schema({
  customerOrderNumber: {
    type: String,
    required: true,
  },
  saKey: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const SaDoc = mongoose.model('SaDoc', saDocSchema);

// Connect to your MongoDB instance
mongoose.connect('mongodb://your db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your documents to upsert
const docsToUpsert = [
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295401',
    status: 'pending',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295502',
    status: 'in progress',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295401',
    status: 'pending',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295502',
    status: 'in progress',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295401',
    status: 'pending',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295502',
    status: 'in progress',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295401',
    status: 'pending',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295502',
    status: 'in progress',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295401',
    status: 'pending',
  },
  {
    customerOrderNumber: '0010032954',
    saKey: '001003295502',
    status: 'in progress',
  },
];

Promise.all(
  docsToUpsert.map((docToUpsert) => {
    return SaDoc.findOneAndUpdate({customerOrderNumber: docToUpsert.customerOrderNumber}, docToUpsert, {upsert: true});
  })
)
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
