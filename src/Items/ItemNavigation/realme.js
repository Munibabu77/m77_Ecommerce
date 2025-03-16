import React, { Fragment } from "react";
import SingleItem from "./SingleItem";

const Rproducts = [
    {
        id: 1,
        img: 'realme1.jpeg',
        name: 'Realme 8pro',
        storage: '6gb 128gb',
        Rear: '108Mp + 8Mp + 2Mp +2mp',
        front: '16Mp',
        processor: 'SDN 720g',
        clocks_speed: '2.2Ghz',
        price:18999
    },
    {
        id: 2,
        img: 'realme2.jpeg',
        name: 'Realme 10pro',
        storage: '6gb 128gb',
        Rear: '108Mp + 8Mp + 2Mp +2mp',
        front: '16Mp',
        processor: 'SDN 720g',
        clocks_speed: '2.2Ghz',
        price:21999
    },
    {
        id: 3,
        img: 'realme1.jpeg',
        name: 'Realme 9i',
        storage: '6gb 128gb',
        Rear: '64Mp + 8Mp + 2Mp +2mp',
        front: '16Mp',
        processor: 'SDN 720g',
        clocks_speed: '2.2Ghz',
        price:15999
    },
    {
        id: 4,
        img: 'realme4.jpeg',
        name: 'Realme 9pro',
        storage: '6gb 128gb',
        Rear: '50Mp(OIS) + 8Mp + 2Mp +2mp',
        front: '16Mp',
        processor: 'Dimensity 1200',
        clocks_speed: '2.2Ghz',
        price:24999
    }
]

const Realme = () => {

    return (
        <Fragment>
            <SingleItem products={Rproducts} />
        </Fragment >
    );
}
export default Realme;