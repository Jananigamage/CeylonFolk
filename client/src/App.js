import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { createMuiTheme,ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import Authentication from './pages/Authentication';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import DetailOfProduct from './components/Product_grid/DetailOfProduct';
import Collections from './pages/Collections'
import MyCart from './pages/MyCart'
import CheckingOut from './pages/CheckingOut'
import Coupon from './pages/Coupon';

const theme = createMuiTheme({
    typography: {
      fontFamily:'Work Sans',
      fontWeightThin: 100,
      fontWeightThinItalic: 100,
      fontWeightExtraLight: 200,
      fontWeightExtraLightItalic: 200,
      fontWeightLight: 300,
      fontWeightLightItalic: 300,
      fontWeightRegular: 400,
      fontWeightRegularItalic: 400,
      fontWeightMedium: 500,
      fontWeightMediumItalic: 500,
      fontWeightSemiblod: 600,
      fontWeightSemiblodtalic: 600,
      fontWeightBlod: 700,
      fontWeightBlodtalic: 700,
      fontWeightExtrablod: 800,
      fontWeightExtrablodtalic: 800,
      fontWeightBlack: 900,
      fontWeightBlackItalic: 900,
      padding: '10px'
    },
    button: {
      fontFamily:'Work Sans',
      fontWeightThin: 100,
      fontWeightThinItalic: 100,
      fontWeightExtraLight: 200,
      fontWeightExtraLightItalic: 200,
      fontWeightLight: 300,
      fontWeightLightItalic: 300,
      fontWeightRegular: 400,
      fontWeightRegularItalic: 400,
      fontWeightMedium: 500,
      fontWeightMediumItalic: 500,
      fontWeightSemiblod: 600,
      fontWeightSemiblodtalic: 600,
      fontWeightBlod: 700,
      fontWeightBlodtalic: 700,
      fontWeightExtrablod: 800,
      fontWeightExtrablodtalic: 800,
      fontWeightBlack: 900,
      fontWeightBlackItalic: 900,
    },
    palette:{
        primary:{
            main:"#2C2D2D",
            light:"#c8d6e5"
        },
        secondary:{
            main:"#74b9ff",
            light:"#dff9fb"
        },
        background:{
          default:'#FFFFFF'
        },
    },
  });


const App = () => {
  
    return(
        <ThemeProvider theme={theme}>
          <Router>
              <Route path="/index" exact render={() => < Home/>}/>
              <Route path="/shop" exact render={() => < Shop/>}/>
              <Route path="/contactus" exact render={() => < Contactus/>}/>       
              <Route path="/auth" exact render={() => < Authentication/>}/>
              <Route path="/productDetails" exact render={() => <DetailOfProduct/>}/>
              <Route path="/admin" exact render={() => <AdminDashboard/>}/>
              <Route path="/users" exact render={() => <Users/>}/>
              <Route path="/cart" exact render={() => <MyCart/>}/>
              <Route path="/checkout" exact render={() => <CheckingOut/>}/>
              <Route path="/collections" exact render={() => <Collections/>}/>
              <Route path="/coupon" exact render={() => <Coupon/>}/>
          </Router>
        </ThemeProvider>
    );
}

export default App;