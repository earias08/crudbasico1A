import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Swal from 'sweetalert2';

const AgregarProducto = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //  validar los datos
    if (
      nombreProducto.trim() === "" ||
      precioProducto <= 0 ||
      precioProducto > 5000 ||
      categoria === ""
    ) {
      // si falla la validacion mostrar el alert de error
      setError(true);
      return;
    } else {
      // si esta todo bien envio los datos a la api
      setError(false);

    //   crear el objeto
    // const producto ={
    //     nombreProducto: nombreProducto,
    //     precioProducto: precioProducto,
    //     categoria: categoria
    // }

    const producto ={
        nombreProducto,
        precioProducto,
        categoria
    }

    console.log(producto);

    try{
      // aqui escribo normalmente el codigo
      const datosEnviar={
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(producto)
      }

      const respuesta = await fetch('http://localhost:3004/cafeteria', datosEnviar);
      console.log(respuesta);

      if(respuesta.status === 201){
        // mostrar un cartel al usuario
        Swal.fire(
          'Producto agregado',
          'Se registro un nuevo producto',
          'success'
        )
        // otras tareas
      }

    }catch(error){
      console.log(error);
      // mostrar cartel al usuario
      Swal.fire(
        'Ocurrio un error',
        'Intentelo en unos minutos',
        'error'
      )
    }

    }
   
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center my-5">Agregar nuevo producto</h1>
        <Form.Group>
          <Form.Label>Nombre de producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Té"
            onChange={(e) => setNombreProducto(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio producto*</Form.Label>
          <Form.Control
            type="number"
            placeholder="40"
            onChange={(e) => setPrecioProducto(parseInt(e.target.value))}
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
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Bebida Fria"
            value="bebidaFria"
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Dulce"
            value="dulce"
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Salado"
            value="salado"
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
        </div>
        <Button variant="danger" className="w-100 mb-4" type="submit">
          Guardar
        </Button>
        {(error === true) ? (
          <Alert variant="warning">Todos los campos son obligatorios</Alert>
        ) : null}
      </Form>
    </Container>
  );
};

export default AgregarProducto;
