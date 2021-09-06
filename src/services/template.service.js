import { db } from "../firebase";

const templateCollection = db.collection("/templates");

class TemplateDataService {
  getAll() {
    return templateCollection;
  }

  create(message) {
    return templateCollection.add(message);
  }

  update(id, value) {
    return templateCollection.doc(id).update(value);
  }

  delete(id) {
    return templateCollection.doc(id).delete();
  }
}

export default new TemplateDataService();