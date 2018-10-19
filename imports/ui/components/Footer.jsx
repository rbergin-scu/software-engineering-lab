import React from 'react';

export default class Business extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          <a href="/" className="h4 text-dark text-uppercase wordmark d-block mb-4">
            Alumni Office
          </a>
          <div className="row">
            <div className="col-12 col-md-9">
              <ul className="list-unstyled list-spaced">
                <li className="mb-0">Donohoe Alumni House</li>
                <li className="mb-0">500 El Camino Real<br />Santa Clara, CA 95053<br /><a href="mailto:alumupdate@scu.edu">alumupdate@scu.edu</a><br />(408) 554-6800</li>
              </ul>
              <ul className="list-inline mb-0 footer-social-icons">
                <li className="list-inline-item"><a className="facebook" href="http://www.facebook.com">
                  <i className="demo-icon fab fa-facebook" />
                  <span className="sr-only">SCU on Facebook</span>
                </a></li>
                <li className="list-inline-item"><a className="twitter" href="http://www.twitter.com">
                  <i className="demo-icon fab fa-twitter" />
                  <span className="sr-only">SCU on Twitter</span>
                </a></li>
                <li className="list-inline-item">
                  <a className="instagram" href="http://www.instagram.com">
                    <i className="demo-icon fab fa-instagram" />
                    <span className="sr-only">SCU on Instagram</span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="snapchat" href="http://www.snapchat.com">
                    <i className="demo-icon fab fa-snapchat" />
                    <span className="sr-only">SCU on Snapchat</span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="youtube" href="http://youtube.com">
                    <i className="demo-icon fab fa-youtube" />
                    <span className="sr-only">SCU on YouTube</span>
                  </a>
                </li>
              </ul>
              <hr className="d-block d-md-none pt-2" />
            </div>
            <div className="col-12 col-md-3">
              <ul className="list-unstyled list-spaced">
                <li>
                  <h6 className="text-uppercase ">Useful Links</h6>
                </li>
                <li><a href="#">Link One</a></li>
                <li><a href="#">Link Two</a></li>
                <li><a href="#">Link Three</a></li>
                <li><a href="#">Link Four</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gradient-primary mt-4 small align-items-center">
          <div className="container d-flex p-3">
        <span className="mr-auto text-uppercase wordmark link-home">
          <a href="/" className="footer-wordmark">Santa Clara University</a>
        </span>
            <div className="mr-auto">
              &copy; 2018 &middot; <a href="/accessibility" className="text-white">Accessibility</a>
            </div>
            <a href="/login" className="text-white px-2">Login</a>
            <span className="text-white px-2">|</span>
            <a className="facebook text-white px-2" href="http://www.facebook.com">
              <i className="demo-icon fab fa-facebook" />
              <span className="sr-only">SCU on Facebook</span>
            </a>
            <a className="twitter text-white pl-2" href="http://www.twitter.com">
              <i className="demo-icon fab fa-twitter" />
              <span className="sr-only">SCU on Twitter</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

}
