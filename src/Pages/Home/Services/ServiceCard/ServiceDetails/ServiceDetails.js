import React, { useContext } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../../../../../hooks/useTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../../../contexts/AuthProvider/AuthProvider';

const ServiceDetails = () => {
    useTitle('Service Details');

    const { user } = useContext(AuthContext);


    const { _id, title, img, price, days, rating, description } = useLoaderData();

    const successMessage = () => {
        toast.success('Data Saved Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const rating = form.rating.value;
        const review = form.review.value;
        const img = "https://media.gettyimages.com/id/1314489757/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=mU_OXyCcBWewSUuA-IQE7LYuwo7FtHqX8pVnpNSSXcQ=";

        const reviewData = {
            service_id: _id,
            img: img,
            name: 'Fahim Chowdhury',
            email: 'fahim@gmail.com',
            rating: rating,
            review: review,
        };

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    form.reset();
                    successMessage();
                }
            })
            .catch(err => console.error(err));
    }


    return (
        <section className='container mt-3'>

            {/* Service Details */}
            <div className="card text-start">
                <div className="card-header">
                    <h2>{title}</h2>
                </div>

                <PhotoProvider speed={() => 800}
                    easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}>
                    <PhotoView src={img}>
                        <img src={img} className="card-img-top" alt=""></img>
                    </PhotoView>
                </PhotoProvider>

                <div className="card-body">
                    <h3 className="card-title pricing-card-title">$ {price}<small className="text-muted fw-light">/{days} days</small></h3>
                    <h5><b>Rating:</b> {rating}</h5>

                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer text-muted"></div>
            </div>



            {/* Add Review  */}
            <div className="card mt-4">
                <div className="card-header text-center"><h3>Add Review</h3></div>
                    <div className='card-body'>
                        {
                            user?.email ?
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Rating</label>
                                        <div className="col-sm-10">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="rating" id="inlineRadio1" defaultValue="1" />
                                                <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="rating" id="inlineRadio2" defaultValue="2" />
                                                <label className="form-check-label">2</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="rating" defaultValue="3" />
                                                <label className="form-check-label">3</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="rating" defaultValue="4" />
                                                <label className="form-check-label">4</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="rating" defaultValue="5" />
                                                <label className="form-check-label">5</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Review</label>
                                        <div className="col-sm-10">
                                            <textarea name="review" className="form-control" cols="20" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <ToastContainer />
                                    </div>
                                </form>
                            :
                            <h3>Please <Link to="/login">Login</Link> First</h3>
                        }
                    </div>
            </div>






        </section>
    );
};

export default ServiceDetails;