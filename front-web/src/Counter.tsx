import {useState} from "react"

function Counter(){
    const [counter, setCounter] = useState(0);

    const handleIncrease = () => {
        setCounter(counter + 1);
    }
    const handDecrease = () => {
        setCounter(counter - 1);
    }

    return (
        <div>
           <button onClick={handleIncrease}>Incrementar</button>
           <button onClick={handDecrease}>Decrementar</button> 
        <h1>Valor do contador: {counter}</h1> 
        </div>
    )
}

export default Counter;