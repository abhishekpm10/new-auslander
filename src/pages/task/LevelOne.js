import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'
import {Button,Jumbotron, Row,Col,Image} from 'react-bootstrap'
import './task.styles.scss'

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
                if((!submitAnswer[0])&&(!hint[0]))
                {
                    hint[0]=true;
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
            if((!submitAnswer[0])&&(!showAnswer[0]))
            {
                showAnswer[0]=true;
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
        if(this.props.correctAnswer===this.state.userAnswer)
        {
           
                    const {id,showAnswer}=this.props;
                    let {submitAnswer,score}=this.props;
                   
                    if(showAnswer)
                    {
                        if(!showAnswer[0])
                        {
                            submitAnswer[0]=true;
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
        const {venue,story,question,dataString,correctAnswer,photos,level,venueTime}=this.props
        
        return (
            <Jumbotron className='task-page task-content-container'>
                <Row className="task-page-heading">Level {level}</Row>
                <Row className="task-page-heading">{venue}</Row>
                {
                    venueTime?(<Row className="task-page-heading">{venueTime}</Row>):null
                }
                
                <Row>
                <Col className='task-images' md={6} sm={12}>{photos?(photos.map((photo)=>(
                    <div className='task-image-container'>
                        <Image className='task-image-container-inner' style={{maxWidth:'300px',height:'auto',padding:'10px'}} src={`${photo}`} ></Image>
                        {/* <h1>Hello</h1> */}
                    </div>
                    ))):null};
                
                </Col>
                <Col md={6} sm={12}className='hero-image-container'>
                    <div className="hero-image">
                        <div className="hero-text">
                            <p>{story}</p>                    
                        </div>
                    </div>
                    
                </Col>
                </Row>
               {/* {console.log(this.props)} */}
               {
                   hint?(hint[0]?<Row><h1>The Hint Is:{dataString}</h1></Row>:null):null
               }
               {
                   showAnswer?(showAnswer[0]?<Row><h1>The Answer Is:{correctAnswer}</h1></Row>:null):null
               }
               {/* <Row><h3>{question}</h3></Row> */}
                <FormInput
                    type='text'
                    name='userAnswer'
                    value={this.state.userAnswer}
                    onChange={this.handleChange}
                    label={`${question}`}
                />
                
                    <Button variant="outline-primary" style={{margin:'0px 5px'}} onClick={this.handleUserAnswer}>Check Answer</Button>
                    <Button variant="outline-primary" style={{margin:'0px 5px'}} onClick={this.handleHint}>Hint Please</Button>
                    <Button variant="outline-primary" style={{margin:'0px 5px'}} onClick={this.handleShowAnswer}>Show Answer</Button>
                    {
                     showAnswer?(showAnswer[0]?<Button variant="outline-primary" style={{margin:'0px 5px'}}><Link to='/level2'> Next Level</Link></Button>:(submitAnswer?(submitAnswer[0]?<Button variant="outline-primary" style={{margin:'0px 5px'}}><Link to='/level2'> Next Level</Link></Button>:null):null)):null
                    }
                
               
            </Jumbotron>
        )
    }
}
