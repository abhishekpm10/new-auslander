import React from "react";

export default function Timer() {
  const [timer, setTimer] = React.useState(5400);
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
      clear();
    }
  }, [timer]);

  return (
    <>
      <div>
        Time left {Math.floor(timer / 60)}:{timer % 60}{" "}
      </div>
    </>
  );
}
