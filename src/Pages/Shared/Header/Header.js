import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../assets/service/service.webp';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
        .then(() => {
            localStorage.removeItem("travelServiceToken");
         })
        .catch(error => console.error(error));
    }

    const menuItems = <>
        <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/services">All Service</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/blog">Blog</Link>
        </li>
        {
            user?.email ?
                <>
                   <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/my-reviews">My Reviews</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/add-service">Add Service</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogOut} className="nav-link btn btn-danger text-light" aria-current="page">Logout</button>
                    </li>
                </>
                :
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                </li>
        }
    </>


    return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light mb-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  <img src={logo} style={{height:'50px',width:'60px'}} alt="Bootstrap" />
                  <span className='ms-2'>Travel Service</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {menuItems}
                  </ul>

                  <form className="d-flex">
                    {
                        user?.uid ?
                        <>
                        {
                            user?.photoURL ?
                            <Image title={user?.displayName} style={{height:'50px'}} roundedCircle src={user.photoURL}></Image>
                            : 
                            <FaUser title="User" style={{height:'50px'}}></FaUser>
                        }
                        </>
                        :
                        <FaUser title="User" style={{height:'50px'}}></FaUser>
                    }
                  </form>
                </div>

            </div>
          </nav>
     
    );
};

export default Header;