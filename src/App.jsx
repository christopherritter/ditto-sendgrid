import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Reset from "./components/Reset.jsx";

import Navbar from "./components/Navbar.jsx";
import Jumbotron from "./components/Jumbotron.jsx";
import SelectTemplate from "./components/SelectTemplate.jsx";
import WriteEmail from "./components/WriteEmail.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [user] = useAuthState(auth);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const history = useHistory();

  // useEffect(() => {
  //   if (loading) {
  //     // maybe trigger a loading screen
  //     return;
  //   }
  //   if (user) history.replace("/");
  // }, [user, loading]);

  // const AssessLoggedInState = () => {
  //   Auth.currentAuthenticatedUser()
  //     .then(() => {
  //       setLoggedIn(true);
  //     })
  //     .catch(() => {
  //       setLoggedIn(false);
  //     });
  // };

  // const setCurrentUser = async () => {
  //   const user = await Auth.currentAuthenticatedUser();
  //   setUser({
  //     username: user.username,
  //     email: user.attributes.email,
  //     authorID: user.attributes.sub,
  //   });
  // };

  // useEffect(() => {
  //   AssessLoggedInState();
  //   if (loggedIn) {
  //     setCurrentUser();
  //   }
  // }, [loggedIn]);

  // const [templates, setTemplates] = useState([]);

  // useEffect(() => {
  //   fetchTemplates();
  // }, []);

  // async function fetchTemplates() {
  //   const apiData = await API.graphql({
  //     query: listTemplates,
  //   });
  //   setTemplates(apiData.data.listTemplates.items);
  // }

  const selectTemplateRef = useRef(null);
  const writeEmailRef = useRef(null);

  const scrollToSelectTemplate = () =>
    selectTemplateRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToWriteEmail = () =>
    writeEmailRef.current.scrollIntoView({ behavior: "smooth" });

  // const [selectedTemplate, setSelectedTemplate] = useState(null);

  // async function createTemplate(formData) {
  //   console.log("createTemplate", formData);
  //   if (!formData.subject || !formData.body) return;
  //   formData = { ...formData, authorID: user.authorID };
  //   await API.graphql({
  //     query: createTemplateMutation,
  //     variables: { input: formData },
  //   });
  //   setTemplates([...templates, formData]);
  // }

  // async function deleteTemplate({ id }) {
  //   const newTemplatesArray = templates.filter(
  //     (template) => template.id !== id
  //   );
  //   setTemplates(newTemplatesArray);
  //   await API.graphql({
  //     query: deleteTemplateMutation,
  //     variables: {
  //       input: {
  //         id,
  //       },
  //     },
  //   });
  // }

  // const signOut = async () => {
  //   try {
  //     await Auth.signOut();
  //     console.log("Successfully signed out");
  //     setLoggedIn(false);
  //   } catch (error) {
  //     console.log("error signing out", error);
  //   }
  // };

  // function signedIn() {
  //   setLoggedIn(true);
  // }

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
              // templates={templates}
              // selectTemplate={(template) => setSelectedTemplate(template)}
              // deleteTemplate={(template) => deleteTemplate(template)}
              writeEmail={scrollToWriteEmail}
            />
            <WriteEmail
              ref={writeEmailRef}
              user={user}
              // selectedTemplate={selectedTemplate}
              // createTemplate={(formData) => createTemplate(formData)}
            />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
