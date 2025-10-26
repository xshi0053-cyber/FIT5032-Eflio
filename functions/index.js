// functions/index.js
const {onRequest} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors");

setGlobalOptions({region: "australia-southeast1"}); 
admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({origin: true});

exports.countBooks = onRequest((req, res) => {
  logger.info("countBooks called", {method: req.method, path: req.path});
  corsHandler(req, res, async () => {
    try {
      const snap = await db.collection("books").count().get(); 
      res.json({count: snap.data().count});
    } catch (err) {
      logger.error(err);
      res.status(500).json({error: err.message});
    }
  });
});
