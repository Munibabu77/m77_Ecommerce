import React ,{Fragment} from "react";
import SingleItem from "./SingleItem";

const Iproducts = [
    {
        id: 9,
        img: 'apple1.jpeg',
        name: 'Iphone 13',
        storage: '256gb',
        Rear: '12Mp + 12Mp',
        front: '12Mp',
        processor: 'A15 Bionic ',
        clocks_speed: '3.23Ghz',
        price:79999
    },
    {
        id: 10,
        img: 'apple2.jpeg',
        name: 'Iphone 13 pro',
        storage:'128gb',
        Rear: '12Mp + 12Mp + 12Mp ',
        front: '12Mp',
        processor: 'A15 Bionic | Hexa core',
        clocks_speed: '3.23 x 2Ghz',
        price:39999
    },
    {
        id: 11,
        img: 'apple3.jpeg',
        name: 'Iphone 12pro',
        storage: '128gb',
        Rear: '12Mp + 12Mp + 12Mp',
        front: '12Mp',
        processor: 'A14 Bionic Chip',
        clocks_speed: '3.1Ghz',
        price:78999
    },
    {
        id: 12,
        img: 'apple4.jpeg',
        name: 'Iphone 14pro',
        storage: '128gb',
        Rear: '48Mp + 12Mp + 12Mp',
        front: '12Mp',
        processor: 'A16 Bionic chip',
        clocks_speed: '3.46Ghz',
        price: 112999
    }
]


const Iphone = () =>{
    return(
        <Fragment>
            <SingleItem products={Iproducts} />
        </Fragment>   
    )
};
export default Iphone;