import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import ListarProductos from "./components/productos/ListarProductos";
import AgregarProducto from "./components/productos/AgregarProducto";
import Navegacion from "./components/common/Navegacion";
import Footer from "./components/common/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(()=>{
    consultarAPI();
  }, []);

  const consultarAPI = async() =>{
    try{
      const respuesta = await fetch('http://localhost:3004/cafeteria');
      console.log(respuesta);
      if(respuesta.status === 200){
        const listaProductos = await respuesta.json();
        setProductos(listaProductos);
      }

    }catch(error){
      console.log(error)
    }   
  }

  return (
    <Router>
      <Navegacion></Navegacion>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListarProductos productos = {productos}></ListarProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto consultarAPI={consultarAPI}></AgregarProducto>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
