import React from 'react'
import {Link} from 'react-router-dom'
import {Button,Jumbotron} from 'react-bootstrap'
import './rules.scss'
export default function rules() {
    return (
        <Jumbotron className='rules-page-container'>
            <div className='rules-page-inner'>
            <h1>Rules:</h1>
            1.	Story comprises of six parts. A participant can move from one part to another only after successful submission of answer of the corresponding part.<br></br>
            2.	Out of six parts, the first five parts comprises of one word answer and the final part consist of conclusion box in which the participant has to provide the most appropriate conclusion to the story<br></br>
            3.	For the first five parts the current score gets incremented by 10 after successful submission of answer for each corresponding part. However :<br></br>
            •	Using hint for any part reduces the current score by 5 <br></br>
            •	If you are not able to find any answer, you can view the answer but then the current score then gets reduced to 10 and then you are not able to submit the following answer and you will be directed towards the next part.<br></br>
            4.	So the max score for the event is 80 . i.e 50 for the first five parts and 30 for the last part or conclusion box. Conclusion part’s score will be hidden and will be allotted by judges.<br></br>
            Contestant with the max score will be declared as winner.<br></br>
            5.	The time for completing the entire event is 1.5 hrs which should be completed within 9-11 pm. Any answer submitted after 11 pm will not be taken into consideration.<br></br>
            6.	Individual track of students are being maintained .Any suspicious activity like submitting two answer within a very short span will be taken into consideration and that candidate’s participation will be debarred.<br></br>
            7.	Any scene of plagiarism(exact copy of other’s answer) will be checked and if one is found to do so, he will be debarred.<br></br>
            <Button style={{margin:'10px'}}> <Link to='theroyalmurder'>Start Now</Link></Button>
            </div>
            
        </Jumbotron>
    )
}
