import React from 'react';
import {Button, ListGroup} from 'react-bootstrap';

const ItemProducto = () => {
    return (
        <ListGroup.Item className='d-flex justify-content-between'>
            <p>Nombre del producto <span className='font-weight-bold'>$ 200</span> </p>
            <div>
                <Button variant='warning' className='mr-3'>Editar</Button>
            <Button variant='danger'>Borrar</Button>
            </div>  
        </ListGroup.Item>
    );
};

export default ItemProducto;