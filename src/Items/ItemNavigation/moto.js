import React, { Fragment } from "react";
import SingleItem from "./SingleItem";

const Mproducts = [
    {
        id: 5,
        img: 'moto1.jpeg',
        name: 'edge 30 fusion',
        storage: '8gb 128gb',
        Rear: '50Mp + 13Mp + 2Mp',
        front: '32Mp',
        processor: 'SDN 888 plus',
        clocks_speed: '2.995Ghz',
        price:49999
    },
    {
        id: 6,
        img: 'moto2.jpeg',
        name: 'Edge30 ultra',
        storage: '8gb 128gb',
        Rear: '200Mp + 50Mp + 12Mp',
        front: '60Mp',
        processor: 'SDN 8+ Gen 1',
        clocks_speed: '3.2Ghz',
        price:39999
    },
    {
        id: 7,
        img: 'moto3.jpeg',
        name: 'Moto g54',
        storage: '12gb 256gb',
        Rear: '50Mp(OIS) + 8Mp',
        front: '16Mp',
        processor: 'Dimensity 7020',
        clocks_speed: '2.2Ghz',
        price:18999
    },
    {
        id: 8,
        img: 'moto4.jpeg',
        name: 'Moto edge4o neo',
        storage: '8gb 128gb',
        Rear: '50Mp(OIS) + 13Mp',
        front: '32Mp',
        processor: 'Dimensity 7030',
        clocks_speed: '2.2Ghz',
        price: 22999
    }
]

const Moto = () => {
    return(
        <Fragment>
            <SingleItem products={Mproducts}/>
        </Fragment >
    );
};
export default Moto;