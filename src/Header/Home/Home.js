import React, { Fragment } from "react";

const Home = () => {
    return (
        <Fragment>
            <div className="container">
                <div className="row ">
                    <div className="col-12 d-flex justify-content-center my-4">
                        <h4 style={{color:"blue"}}>New Launch's</h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-6 d-flex justify-content-end" >
                        <img style={{ width: '50%' ,marginBottom:'1rem'}} src="iphone.jpeg" alt="New launch" />
                    </div>
                    <div className="col-6 mt-5">
                        <h2><img src="iphones.jpeg" alt="Apple Logo" />Iphone</h2>
                        <p style={{ fontSmooth: '35px', fontSize: '35px', paddingLeft: '25px' }}>iPhone 15</p>
                        <h3 className="mx-4">Buy Now</h3>
                        <p style={{ fontSmooth: '35px', fontSize: '20px', paddingLeft: '25px' }}>An upgrade from every Angle</p>
                        <p style={{ fontSize: '15px', paddingLeft: '25px' }} >Beautiful. Durable. Phenomenal</p>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-6 d-flex justify-content-end" >
                        <img style={{ width: '50%' ,marginBottom:'1rem'}} src="Googles.jpeg" alt="New launch" />
                    </div>
                    <div className="col-6 mt-5">
                        <h2><img src="Google.jpeg" alt="Google Logo" style={{width:'15%'}}/>Google</h2>
                        <p style={{ fontSmooth: '35px', fontSize: '35px', paddingLeft: '25px' }}>Google 8 | 8 pro</p>
                        <h3 className="mx-4">Buy Now</h3>
                        <p style={{ fontSmooth: '35px', fontSize: '20px', paddingLeft: '25px' }}>An upgrade for camera</p>
                        <p style={{ fontSize: '15px', paddingLeft: '25px' }} >Make your day beautiful with stunning cameras</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Home;