import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'


export default class LevelFive extends Component {

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
                if(!hint[4])
                {
                    hint[4]=true;
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
            if(!showAnswer[4])
            {
                showAnswer[4]=true;
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
                        if(!showAnswer[4])
                        {
                            submitAnswer[4]=true;
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
                   hint?(hint[4]?<h1>The Hint Is:{dataString}</h1>:null):null
               }
               {
                   showAnswer?(showAnswer[4]?<h1>The Answer Is:{correctAnswer}</h1>:null):null
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
                <Link to='/level4'>Previous Level</Link>
                {
                     showAnswer?(showAnswer[4]?<Link to='/level6'> Next Level</Link>:(submitAnswer?(submitAnswer[4]?<Link to='/level6'> Next Level</Link>:null):null)):null
                }
            </div>
        )
    }
}
