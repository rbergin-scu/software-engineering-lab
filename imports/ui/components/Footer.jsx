import React from 'react';

/**
 * The bottom of all pages containing relevant links
 */
export default class Footer extends React.Component {
  
  render() {
    return (
      <footer className="footer-core bg-white pt-5">
        <div className="container">
          <a href="/" className="h4 text-dark text-uppercase wordmark d-block mb-4">
            Alumni Office
          </a>
          <div className="row">
            <div className="col-12 col-md-9">
              <ul className="list-unstyled list-spaced">
                <li className="mb-0">Donohoe Alumni House</li>
                <li className="mb-0">500 El Camino Real<br/>Santa Clara, CA 95053<br/><a
                  href="mailto:alumupdate@scu.edu">alumupdate@scu.edu</a><br/>(408) 554-6800
                </li>
              </ul>
              <ul className="list-inline mb-0 footer-social-icons">
                <li className="list-inline-item"><a className="facebook" href="http://www.facebook.com">
                  <i className="demo-icon fab fa-facebook"/>
                  <span className="sr-only">SCU on Facebook</span>
                </a></li>
                <li className="list-inline-item"><a className="twitter" href="http://www.twitter.com">
                  <i className="demo-icon fab fa-twitter"/>
                  <span className="sr-only">SCU on Twitter</span>
                </a></li>
                <li className="list-inline-item">
                  <a className="instagram" href="http://www.instagram.com">
                    <i className="demo-icon fab fa-instagram"/>
                    <span className="sr-only">SCU on Instagram</span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="snapchat" href="http://www.snapchat.com">
                    <i className="demo-icon fab fa-snapchat"/>
                    <span className="sr-only">SCU on Snapchat</span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="youtube" href="http://youtube.com">
                    <i className="demo-icon fab fa-youtube"/>
                    <span className="sr-only">SCU on YouTube</span>
                  </a>
                </li>
              </ul>
              <hr className="d-block d-md-none pt-2"/>
            </div>
            <div className="col-12 col-md-3">
              <ul className="list-unstyled list-spaced">
                <li>
                  <h6 className="text-uppercase ">SCU Alumni</h6>
                </li>
                <li><a href="https://www.scu.edu/alumni/">Home</a></li>
                <li><a href="https://www.scu.edu/alumni/events/">Events</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gradient-primary mt-4 small align-items-center">
          <div className="container d-flex align-items-center p-3">
            <span className="mr-auto text-uppercase wordmark link-home">
              <a href="https://scu.edu" className="footer-wordmark">Santa Clara University</a>
            </span>
            <div className="d-flex align-items-center ml-auto">
              <div>
                <span className="px-2">&copy; 2018</span>
              </div>
              <div>
                <a href="/admin" className="text-white px-2">Admin</a>
                <span className="text-white px-2">|</span>
                <a href="/" className="text-white px-2">Home</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
}
