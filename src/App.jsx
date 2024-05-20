import Login from "./pages/login";
import Election from "./pages/election";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/Sidebarprovider";
import Sidebar from "./components/Sidebar";
import Guide from "./pages/guide";
import Tableau from "./pages/dashboard";
import Visu from "./pages/visu";
import LoginOrga from "./pages/loginOrga";
import Organisateur from "./pages/organisateur";
import LoginAdmin from "./pages/loginAdmin";
import Admin from "./pages/admin";
import { UserContextProvider } from "../context/usercontext";
import API from './constants/Apis';
import ConfirmElection from "./pages/confirmelection";

// const { Header, Sider } = Layout;
axios.defaults.baseURL = API.APIuri;
axios.defaults.withCredentials = true;


function App() {
  return (
    <>
      <UserContextProvider>
      <SidebarProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/confirm" element={<ConfirmElection />} />
          <Route path="/tableau" element={<Tableau />} />
          <Route path="/election" element={<Election />} /> 
          <Route path="/guide" element={<Guide />} />
          <Route path="/visu/*" element={<Visu />} />
          <Route path="/loginOrga" element={<LoginOrga />} />
          <Route path="/organisateur" element={<Organisateur />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/confirmelection" element={<ConfirmElection />} />
        </Routes>
      </SidebarProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
