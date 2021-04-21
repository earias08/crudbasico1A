import React, {useState} from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const AgregarProducto = () => {
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState(0);
    const [categoria, setCategoria] = useState('');

    const cambiarCategoria = (e) =>{
        setCategoria(e.target.value)
    }

  return (
    <Container>
      <Form>
        <h1 className="text-center my-5">Agregar nuevo producto</h1>
        <Form.Group>
          <Form.Label>Nombre de producto*</Form.Label>
          <Form.Control type="text" placeholder="Té" onChange={(e)=> setNombreProducto(e.target.value) }></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio producto*</Form.Label>
          <Form.Control type="number" placeholder="40" onChange={(e)=> setPrecioProducto(parseInt(e.target.value))}></Form.Control>
        </Form.Group>
        <h3 className="text-center">Categoria</h3>
        <div className="text-center my-4">
          <Form.Check
            name="categoria"
            type="radio"
            label="Bebida Caliente"
            value='bebidaCaliente'
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Bebida Fria"
            value='bebidaFria'
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Dulce"
            value='dulce'
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
          <Form.Check
            name="categoria"
            type="radio"
            label="Salado"
            value='salado'
            onChange={cambiarCategoria}
            inline
          ></Form.Check>
        </div>
        <Button variant="danger" className="w-100 mb-4">
          Guardar
        </Button>
        <Alert variant="warning">Todos los campos son obligatorios</Alert>
      </Form>
    </Container>
  );
};

export default AgregarProducto;
