import React from "react";
import {reactLocalStorage} from 'reactjs-localstorage'
import { auth } from '../../firebase/firebase.utils';


export default function Timer({totalTime}) {
  const tmpVal=reactLocalStorage.get('timer', 5700);
  const [timer, setTimer] = React.useState(tmpVal);
  const id = React.useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      console.log("sorry you cann't attemp test anymore");
      auth.signOut();
      clear();
    }if(timer%10===0)
    {
      reactLocalStorage.set('timer', timer);
      console.log(timer)
    }
  }, [timer]);

  return (
    <>
      <div style={{color:'white'}}>
        Time left {Math.floor(timer / 60)}:{timer % 60}{" "}
      </div>
    </>
  );
}


