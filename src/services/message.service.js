import { db } from "../firebase";

const messageCollection = db.collection("/messages");

class MessageDataService {
  getAll() {
    return messageCollection;
  }

  create(message) {
    return messageCollection.add(message);
  }

  update(id, value) {
    return messageCollection.doc(id).update(value);
  }

  delete(id) {
    return messageCollection.doc(id).delete();
  }
}

export default new MessageDataService();