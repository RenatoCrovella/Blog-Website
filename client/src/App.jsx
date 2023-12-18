import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import Index from "../src/component/Index";
import CreatePage from "../src/component/CreatePage";
import NotFound from "../src/component/NotFound";
import DetailedBlogView from "./component/DetailedBlogView";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);  //MUDAR PARA FALSE DEPOIS!

  console.log("App.js");
  return (
    <Router>
      <div>
        <Header isLogged={isLogged} />

        <Routes>
          <Route
            path="/"
            element={<Index route="/" />} //Pass route prop for '/'
          />
          <Route
            path="/technical"
            element={<Index route="/technical" />} // Pass route prop for '/technical' #NOT USED YET
          />
          <Route
            path="/other"
            element={<Index route="/other" />} // Pass route prop for '/other' #NOT USED YET
          />
          <Route 
            path="/create" 
            element={<CreatePage isLogged={isLogged} />} />
          <Route
            path="/edit/:blogId"
            element={<DetailedBlogView isLogged={isLogged} isEditing={true} />}
          />
          <Route
            path="/read/:blogId"
            element={<DetailedBlogView isLogged={isLogged} isEditing={false} />}
          />
          <Route
            path="/*"
            element={<NotFound />} // No route prop needed for NotFound
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
