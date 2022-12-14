import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Private from "./components/Private";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route element={<Private />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/add' element={<AddProduct />}></Route>
          <Route path='/update/:id' element={<UpdateProduct />}></Route>
          <Route path='/profile' element={<h1>profile</h1>}></Route>
          <Route path='/logout'></Route>
        </Route>

        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
