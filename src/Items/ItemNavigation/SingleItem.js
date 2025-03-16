import React, { Fragment} from "react";
import ItemDispaly from "./ItemDisplay";



const SingleItem = (props) => {
    
    
    return (
        <Fragment>
            <div className="container rounded px-5 py-4">
                <div className="row d-flex">
                    {props.products.map((product) => {
                        return (
                            <span key={product.name} className="col-6 d-flex py-4" id={product.id}>
                                <img src={product.img} alt="product pic" />
                                <div>
                                    <ul>
                                        <li><h5>{product.name}</h5></li>
                                        <li>{product.storage}</li>
                                        <li>{product.Rear}</li>
                                        <li>{product.front}</li>
                                        <li>{`${product.processor} | ${product.clocks_speed}`}</li>
                                        <span style={{ fontStyle: 'revert' }}>{`Rs:- ${product.price} /-`}</span>
                                    </ul>
                                    <ItemDispaly name={product.name} id={product.id} price={product.price}/>
                                </div>
                            </span>
                        )
                    })}
                </div>
            </div>
        </Fragment >
    );
}
export default SingleItem;