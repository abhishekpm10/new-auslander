import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'


export default class LevelThree extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userAnswer: ''
        };
      }
    
    
    handleHint=async ()=>{
            const {id}=this.props;
            let {hint,score}=this.props;

            if(hint)
            {
                if(!hint[2])
                {
                    hint[2]=true;
                    const userRef=firestore.doc(`users/${id}`);       
                    await userRef.update({hint,score:score-5});
                }
            }
            
    }

    handleShowAnswer=async ()=>{
        const {id}=this.props;
        let {showAnswer,score}=this.props;
        
        if(showAnswer)
        {
            if(!showAnswer[2])
            {
                showAnswer[2]=true;
                const userRef=firestore.doc(`users/${id}`);       
                await userRef.update({showAnswer,score:score-10});
            }
        }
       
    }

    handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };

    handleUserAnswer =async ()=>{
        if(this.props.correctAnswer===this.state.userAnswer)
        {
           
                    const {id,showAnswer}=this.props;
                    let {submitAnswer,score}=this.props;
                   
                    if(showAnswer)
                    {
                        if(!showAnswer[2])
                        {
                            submitAnswer[2]=true;
                            const userRef=firestore.doc(`users/${id}`);       
                            await userRef.update({submitAnswer,score:score+10});
                        }  
                    }
                    
            alert("Congratulations your answer is correct, You can move to next level now");
        }
        else
            alert("Ohh No Your Answer Is wrong Try to take hint/show answer if you are stuck. It comes with penalty ");
    }  

    render() {
        const {id}=this.props;
        const {showAnswer,submitAnswer,hint} =this.props;
        const {venue,story,question,dataString,correctAnswer,photos}=this.props
        
        return (
            <div>
                <h1>{venue}</h1>
                <div>{photos?console.log(`check ${id} complete`):null}</div>
                <p>{story}</p>
                <h3>{question}</h3>

               {/* {console.log(this.props)} */}
               {
                   hint?(hint[2]?<h1>The Hint Is:{dataString}</h1>:null):null
               }
               {
                   showAnswer?(showAnswer[2]?<h1>The Answer Is:{correctAnswer}</h1>:null):null
               }
                <FormInput
                    type='text'
                    name='userAnswer'
                    value={this.state.userAnswer}
                    onChange={this.handleChange}
                    label='Input Anwer Here'
                />
                <button onClick={this.handleUserAnswer}>Check Answer</button>
                 <button onClick={this.handleHint}>Hint Please</button>
                <button onClick={this.handleShowAnswer}>Show Answer</button>
                <Link to='/level2'>Previous Level</Link>
                {
                     showAnswer?(showAnswer[2]?<Link to='/level4'> Next Level</Link>:(submitAnswer?(submitAnswer[2]?<Link to='/level4'> Next Level</Link>:null):null)):null
                }
            </div>
        )
    }
}
