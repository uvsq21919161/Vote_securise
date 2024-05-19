import Login from "./pages/login";
import Election from "./pages/election";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/Sidebarprovider";
import Sidebar from "./components/Sidebar";
import Guide from "./pages/guide";
import Tableau from "./pages/dashboard";
import { UserContextProvider } from "../context/usercontext";

// const { Header, Sider } = Layout;
axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;


function App() {
  return (
    <>
      {/* <Layout>
        <Sider className='sidebar'>
          <Logo />
          <MenuList />
        </Sider>
      </Layout> */}
      {/* <Login /> */}
      <UserContextProvider>
      <SidebarProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/tableau" element={<Tableau />} />
          <Route path="/election" element={<Election />} /> 
          <Route path="/guide" element={<Guide />} />
          {/* <Route path="/visu" element={<Visualisation />} /> */}
        </Routes>
      </SidebarProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
