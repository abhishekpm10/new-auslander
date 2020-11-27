import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'


export default class LevelSix extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userAnswer: ''
        };
      }
    
    
    handleStory=async ()=>{
            const {id}=this.props;
            const userRef=firestore.doc(`users/${id}`);       
            await userRef.update({finalStory:this.state.userAnswer});   
            alert(`${this.props.displayName} We have receiced your answer, You can sign out and close tab`)        
    }

    handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };
    
    render() {
        const {id}=this.props;
        const {venue,story,question,photos}=this.props
        
        return (
            <div>
                <h1>{venue}</h1>
                <div>{photos?console.log(`check ${id} complete`):null}</div>
                <p>{story}</p>
                <h3>{question}</h3>
            
                <FormInput
                    type='text'
                    name='userAnswer'
                    value={this.state.userAnswer}
                    onChange={this.handleChange}
                    label='Input Anwer Here'
                />
                <button onClick={this.handleStory}>Submit Story</button>
                <Link to='/level5'>Previous Level</Link>
               
            </div>
        )
    }
}
