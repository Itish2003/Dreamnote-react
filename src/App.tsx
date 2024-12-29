import "./App.css";
import "./index.css";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Form from "./components/Form";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import { CreateBlog } from "./components/CreateBlog";
import {BlogsPage} from "./components/BlogsPage";


function App() {

  return (
    <>
      <UserProvider>
        <NavBar />
        <LandingPage />
        <Form />
        <CreateBlog/>
        <BlogsPage/>
        <Dashboard/>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
