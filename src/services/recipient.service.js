import { db } from "../firebase";

const recipientCollection = db.collection("/recipients");

class RecipientDataService {
  getAll() {
    return recipientCollection;
  }

  create(message) {
    return recipientCollection.add(message);
  }

  update(id, value) {
    return recipientCollection.doc(id).update(value);
  }

  delete(id) {
    return recipientCollection.doc(id).delete();
  }
}

export default new RecipientDataService();