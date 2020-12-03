import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'
import {Button,Jumbotron, Row,Col} from 'react-bootstrap'
import './styles/LevelSix.scss'

export default class LevelOne extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userAnswer: ''
        };
      }
    

    handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value.toLowerCase() });
      };

    handleUserAnswer =async ()=>{         
            const {id}=this.props;
            
                   
            const userRef=firestore.doc(`users/${id}`);       
            
            const {finalStory}=await (await userRef.get()).data();
            if(finalStory)        
            alert("Congratulations your story is received, You can sign out now");
            else
            {
                await userRef.update({finalStory:this.state.userAnswer});
                alert("Congratulations your story is received, You can sign out now");
            }
            
        }
        

    render() {
        // const {id}=this.props;
        const {showAnswer,hint} =this.props;
        const {venue,story,question,dataString,correctAnswer,level,venueTime}=this.props
        
        return (
            <Jumbotron className='six-task-page'>
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
                        lastLevelStory
                    />
                </div>
               
               {/* {console.log(this.props)} */}
               {
                   hint?(hint[5]?<Row><h1>The Hint Is:{dataString}</h1></Row>:null):null
               }
               {
                   showAnswer?(showAnswer[5]?<Row><h1>The Answer Is:{correctAnswer}</h1></Row>:null):null
               }
               {/* <Row><h3>{question}</h3></Row> */}
               <div className="outside-book">
                    <Button variant="success" style={{margin:'0px 5px'}} onClick={this.handleUserAnswer}>Submit Story</Button>
                    {
                        showAnswer?(<Button variant="outline-primary" style={{margin:'0px 5px'}}><Link to='/blackhoodeddevil'> Previous Level</Link></Button>):null
                    }
                   
                </div>
               
            </Jumbotron>
        )
    }
}
