import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import TemplateDataService from "./services/template.service";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Reset from "./components/Reset.jsx";

import Navbar from "./components/Navbar.jsx";
import Jumbotron from "./components/Jumbotron.jsx";
import SelectTemplate from "./components/SelectTemplate.jsx";
import WriteEmail from "./components/WriteEmail.jsx";
import Profile from "./components/Profile.jsx";
import PrivacyPolicy from "./components/Privacy.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [user] = useAuthState(auth);
  const [templates, setTemplates] = React.useState([]);

  const selectTemplateRef = useRef(null);
  const writeEmailRef = useRef(null);

  const scrollToSelectTemplate = () =>
    selectTemplateRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToWriteEmail = () =>
    writeEmailRef.current.scrollIntoView({ behavior: "smooth" });

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  async function deleteTemplate({ id }) {
    TemplateDataService.delete(id)
      .then(() => {
        getTemplates();
      })
      .catch((e) => {
        console.log("catch:", e);
      });
  }

  async function getTemplates() {
    const snapshot = await TemplateDataService.getAll().get();
    const results = [];
    snapshot.forEach((doc) => {
      results.push(doc.data());
    });
    setTemplates(results);
  }

  return (
    <div className="App">
      <Router>
        <Navbar
          loggedIn={user}
          // signOut={signOut}
        />
        <Switch>
          <Route exact path="/">
            <Jumbotron
              selectTemplate={scrollToSelectTemplate}
              writeEmail={scrollToWriteEmail}
            />
            <SelectTemplate
              ref={selectTemplateRef}
              user={user}
              templates={templates}
              selectTemplate={(template) => setSelectedTemplate(template)}
              deleteTemplate={(template) => deleteTemplate(template)}
              writeEmail={scrollToWriteEmail}
            />
            <WriteEmail
              ref={writeEmailRef}
              user={user}
              selectedTemplate={selectedTemplate}
              selectTemplate={(template) => setSelectedTemplate(template)}
              scrollToWriteEmail={scrollToWriteEmail}
              // createTemplate={(formData) => createTemplate(formData)}
            />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/privacy" component={PrivacyPolicy} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
