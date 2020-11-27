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
      currentUser: null 
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

  handleHint=()=>{
      const {currentUser}=this.state;
      let {hint,score}=currentUser;
      console.log(hint[2]);
      if(!hint[0])
      {
        hint[0]=true;
        const userRef=firestore.doc(`users/${currentUser.id}`);
        userRef.update({...currentUser,hint,score:score-5});
      }
      
  }

  


  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        
        <button onClick={this.handleHint}>Hint</button>

        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
