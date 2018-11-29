import React from 'react';

import { renderRoutes } from '/imports/startup/client/routes';
import Footer from '/imports/ui/components/Footer';
import Header from '/imports/ui/components/Header';

/**
 * Standard app layout
 */
export default class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
    
    };
  }
  
  render() {
    return (
      <div>
        <Header />
        { renderRoutes() }
        <Footer />
      </div>
    )
  }

}
