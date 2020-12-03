import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'
import {Button,Jumbotron, Row,Col} from 'react-bootstrap'
import './styles/LevelFive.scss'

export default class LevelOne extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userAnswer: ''
        };
      }
    
    
    handleHint=async ()=>{
            const {id}=this.props;
            let {hint,score,submitAnswer}=this.props;

            if(hint)
            {
                if((!submitAnswer[4])&&(!hint[4]))
                {
                    hint[4]=new Date();
                    const userRef=firestore.doc(`users/${id}`);       
                    await userRef.update({hint,score:score-5});
                }
            }
            
    }

    handleShowAnswer=async ()=>{
        const {id}=this.props;
        let {showAnswer,score,submitAnswer}=this.props;
        
        if(showAnswer)
        {
            if((!submitAnswer[4])&&(!showAnswer[4])&&(!showAnswer[0]))
            {
                showAnswer[4]=new Date();
                const userRef=firestore.doc(`users/${id}`);       
                await userRef.update({showAnswer,score:score-10});
            }
        }
       
    }

    handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value.toLowerCase() });
      };

    handleUserAnswer =async ()=>{
        // const userRef=firestore.doc(`answers/4`);       
        // const {level1}=await (await userRef.get()).data();
        // console.log(level1);
        if(this.props.correctAnswer===this.state.userAnswer)
        {
           
                    const {id,showAnswer}=this.props;
                    let {submitAnswer,score}=this.props;
                   
                    if(showAnswer)
                    {
                        if(!showAnswer[4]&&!submitAnswer[4])
                        {
                            submitAnswer[4]=new Date();
                            console.log(showAnswer[4]);
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
        // const {id}=this.props;
        const {showAnswer,submitAnswer,hint} =this.props;
        const {venue,story,question,dataString,correctAnswer,level,venueTime}=this.props
        
        return (
            <Jumbotron className='five-task-page'>
                <div className="inside-book">
                    <Row className="task-page-heading">Level {level}</Row>                   
                    <Row className="task-page-heading">{venue}</Row>
                    {
                        venueTime?(<Row className="task-page-heading">{venueTime}</Row>):null
                    }     
                    <Row> 
                    <Col className='hero-image-container'>
                        <div className="hero-image">
                            <div className="hero-text">
                                <p>{story}</p>                    
                            </div>
                        </div>
                        
                    </Col>
                    </Row>
                    <FormInput
                        type='text'
                        name='userAnswer'
                        value={this.state.userAnswer}
                        onChange={this.handleChange}
                        label={`${question}`}
                    />
                </div>
               
               {/* {console.log(this.props)} */}
               {
                   hint?(hint[4]?<Row><h1>The Hint Is:{dataString}</h1></Row>:null):null
               }
               {
                   showAnswer?(showAnswer[4]?<Row><h1>The Answer Is:{correctAnswer}</h1></Row>:null):null
               }
               {/* <Row><h3>{question}</h3></Row> */}
               <div className="outside-book">
                    <Button variant="success" style={{margin:'0px 5px'}} onClick={this.handleUserAnswer}>Check Answer</Button>
                    <Button variant="warning" style={{margin:'0px 5px'}} onClick={this.handleHint}>Hint Please</Button>
                    <Button variant="danger" style={{margin:'0px 5px'}} onClick={this.handleShowAnswer}>Show Answer</Button>
                    {
                        showAnswer?(<Button variant="outline-primary" style={{margin:'0px 5px'}}><Link to='/nightofdarkness'> Previous Level</Link></Button>):null
                    }
                    {
                     showAnswer?(showAnswer[4]?<Button variant="success" style={{margin:'0px 5px'}}><Link to='/endgame'> Next Level</Link></Button>:(submitAnswer?(submitAnswer[4]?<Button variant="success" style={{margin:'0px 5px'}}><Link to='/endgame'> Next Level</Link></Button>:null):null)):null
                    }
                </div>
               
            </Jumbotron>
        )
    }
}
