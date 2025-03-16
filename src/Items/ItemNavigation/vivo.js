import React, { Fragment } from "react";
import SingleItem from "./SingleItem";


const Vproducts = [
    {
        id: 13,
        img: 'vivo1.jpeg',
        name: 'vivo x90 pro',
        storage: '12gb 256gb',
        Rear: '50Mp + 50Mp + 12Mp',
        front: '32Mp',
        processor: 'Dimensity 9200',
        clocks_speed: '3.05Ghz',
        price: 84999
    },
    {
        id: 14,
        img: 'vivo2.jpeg',
        name: 'Vivo v27pro',
        storage: '8gb 128gb',
        Rear: '50Mp(OIS) + 50Mp + 12Mp',
        front: '50Mp',
        processor: 'Dimensity 8200',
        clocks_speed: '3.1Ghz',
        price: 39999
    },
    {
        id: 15,
        img: 'vivo3.jpeg',
        name: 'Vivo x90',
        storage: '8gb 256gb',
        Rear: '50Mp(OIS) + 12Mp +12Mp',
        front: '32Mp',
        processor: 'Dimensity 9200',
        clocks_speed: '3.05Ghz',
        price: 59999
    },
    {
        id: 16,
        img: 'vivo4.jpeg',
        name: 'Vivo v29e',
        storage: '8gb 128gb',
        Rear: '64Mp(OIS) + 13Mp',
        front: '50Mp',
        processor: 'SDN 695 5g',
        clocks_speed: '2.5Ghz',
        price: 26499
    }
]

const Vivo = (props) => {
    return (
        <Fragment>
            <SingleItem products={Vproducts}/>
        </Fragment >
    );
};
export default Vivo;