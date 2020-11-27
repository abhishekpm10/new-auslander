import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument,firestore } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      hint:false
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          },()=>{console.log(this.state.currentUser)});
        });
      }else{
        this.setState({ currentUser: userAuth });
      }

      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleClick=()=>{
      // const {currentUser}=this.state;
      // console.log(currentUser);
      // const userRef=firestore.doc(`users/${currentUser.id}`);
   
      // this.setState({hint:true})
      // userRef.update({...currentUser,task1Hint:!currentUser.task1Hint});
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        
        <button onClick={this.handleClick}>add</button>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
