import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, withRouter } from "react-router-dom";
import { campoRequerido, rangoPrecio } from "../common/helpers";

const EditarProducto = (props) => {
  // obtener el parametro
  const codProducto = useParams().id;
  // const {id} = useParams();
  // creo los state
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  const [producto, SetProducto] = useState({});
  const URL = process.env.REACT_APP_API_URL + "/" + codProducto;
  // aqui creo las variables useRef
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef(0);

  useEffect(async () => {
    try {
      const respuesta = await fetch(URL);
      if (respuesta.status === 200) {
        const productoSolicitado = await respuesta.json();
        SetProducto(productoSolicitado);
      }
    } catch (error) {
      console.log(error);
      // mostrar un mensaje de error
    }
  }, []);

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let categoriaModificada = categoria === "" ? producto.categoria : categoria;
    // console.log(nombreProductoRef.current.value);
    // validar los datos
    if (
      campoRequerido(nombreProductoRef.current.value) &&
      rangoPrecio(parseFloat(precioProductoRef.current.value)) &&
      campoRequerido(categoriaModificada)
    ) {
      // si son correctos hago el request
      setError(false);

      try{
        const productoModificado = {
          nombreProducto: nombreProductoRef.current.value,
          precioProducto: precioProductoRef.current.value,
          categoria: categoriaModificada
        }
        
        const respuesta = await fetch(URL,{
          method:'PUT',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(productoModificado)
        });
      
        if(respuesta.status === 200){
          // se actualizaron los datos en la api
          Swal.fire(
            'Producto modificado',
            'Se actualizaron los datos del producto',
            'success'
          )
          // consultar la api
            props.consultarAPI();
          // redireccionar
          props.history.push('/productos');
        }

      }catch(error){
        console.log(error);
        // mostrar un cartel al usuario
      }

    } else {
      // si no muestro el cartel de error
      setError(true);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center my-5">Editar producto</h1>
        <Form.Group>
          <Form.Label>Nombre de producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Té"
            defaultValue={producto.nombreProducto}
            ref={nombreProductoRef}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio producto*</Form.Label>
          <Form.Control
            type="number"
            placeholder="40"
            defaultValue={producto.precioProducto}
            ref={precioProductoRef}
          ></Form.Control>
        </Form.Group>
        <h3 className="text-center">Categoria</h3>
        <div className="text-center my-4">
          <Form.Check
            name="categoria"
            type="radio"
            label="Bebida Caliente"
            value="bebidaCaliente"
            onChange={cambiarCategoria}
            inline
            defaultChecked={
              producto.categoria && producto.categoria === "bebidaCaliente"
            }
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Bebida Fria"
            value="bebidaFria"
            onChange={cambiarCategoria}
            inline
            defaultChecked={
              producto.categoria && producto.categoria === "bebidaFria"
            }
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Dulce"
            value="dulce"
            onChange={cambiarCategoria}
            defaultChecked={
              producto.categoria && producto.categoria === "dulce"
            }
            inline
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Salado"
            value="salado"
            onChange={cambiarCategoria}
            inline
            defaultChecked={
              producto.categoria && producto.categoria === "salado"
            }
          ></Form.Check>
        </div>
        <Button variant="danger" className="w-100 mb-4" type="submit">
          Guardar
        </Button>
        {error === true ? (
          <Alert variant="warning">Todos los campos son obligatorios</Alert>
        ) : null}
      </Form>
    </Container>
  );
};

export default withRouter(EditarProducto);
