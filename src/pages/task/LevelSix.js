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

    handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value.toLowerCase() });
      };

    handleUserAnswer =async ()=>{
                    const {id}=this.props;
                    if(id)
                    {
                      const userRef=firestore.doc(`users/${id}`);       
                      await userRef.update({finalStory:this.state.userAnswer});
                    }         
            alert("Congratulations your story is received at our end, You can close the tab now");
    }  

    render() {
        // const {id}=this.props;
        const {showAnswer} =this.props;
        const {venue, story,question,photos,level,venueTime}=this.props
        
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
              
                <FormInput
                    type='text'
                    name='userAnswer'
                    value={this.state.userAnswer}
                    onChange={this.handleChange}
                    label={`${question}`}
                    lastLevelStory
                />
                
                    <Button variant="outline-primary" style={{margin:'0px 5px'}} onClick={this.handleUserAnswer}>Submit Story</Button>
                    {
                        showAnswer?(<Button variant="outline-primary" style={{margin:'0px 5px'}}><Link to='/level5'> Previous Level</Link></Button>):null
                    }
                    
                
               
            </Jumbotron>
        )
    }
}
