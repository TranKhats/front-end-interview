import { getElementError } from "@testing-library/react";
import { useState } from "react";
import InterviewServices from "../../services/interview-services";
import '../interview-ui/style.css'
const InterviewUI = (props => {
    const [arrayLength, setArrayLength] = useState(0);
    const [listElements, setListElements] = useState({});
    const [listRequestNbrs, setListRequestNbrs] = useState([]);
    const [resultApiData, setResultApiData] = useState();
    const [resultApiError, setResultApiError] = useState();
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = [];
        if (Object.keys(listElements).length == 0) {
            setError('Please input the number all fields!');
            return;
        }
        for (const property in listElements) {
            if (listElements[property]) {
                data.push(listElements[property])
            } else {
                setError('Please input the number all fields!');
                return;
            }
        }
        setError('')
        setLoading(true)
        const result = await InterviewServices.getAnswer(data);
        if (result.isSuccessed) {
            setResultApiData(result.resultObj)
            setResultApiError('')
        } else {
            setResultApiData('')
            setResultApiError(result.message)
        }
        setLoading(false)
        // setResultApi(result);
    }

    const focusNextInput = (e) => {
        // console.log(1);

        if (e.key === 'Enter' || e.key === 'Tab') {
            var index = e.target.name[e.target.name.length - 1];
            if (index) {
                const id = `data-input${parseInt(index) + 1}`;
                const nextElement = document.getElementById(id);
                if (nextElement) {
                    nextElement.focus();
                }
            }
        }

    }

    const onChangeDataInputs = (e) => {
        // console.log(2);

        const data = { ...listElements };
        data[e.target.name] = e.target.value;
        console.log('dataaa', data);
        setListElements(data);
        // var index = e.target.name[e.target.name.length - 1];
        // if (index) {
        //     const id = `data-input${parseInt(index) + 1}`;
        //     const nextElement = document.getElementById(id);
        //     if (nextElement) {
        //         nextElement.focus();
        //     }
        // }

    }

    const renderInputs = () => {
        var indents = [];
        for (var i = 1; i <= arrayLength; i++) {
            indents.push(
                <div key={i}>
                    <input key={i} type="number" id={`data-input${i}`} name={`data${i}`} onKeyUp={focusNextInput} value={listElements[i]} onChange={onChangeDataInputs} />
                </div>
            );
        }
        return (<>
            {indents}
        </>);
    }

    return (
        <div className="container">
            <h3>This is interview form</h3>
            {
                <div id="answer-container">
                    {
                        isLoading == false && resultApiData? (<h5 className="success-msg">The result is: {resultApiData}</h5>) :
                            (<h4 className="error-msg">{resultApiError}</h4>)
                    }

                </div>
            }
            <h5>{isLoading ? "Please wait...." : ""}</h5>

            <label>How many elements are there in your array?</label>
            <input type="number" name="data" min={0} value={arrayLength} onChange={e => setArrayLength(e.target.value)} />

            {/* <button onClick={(e) => { onSubmit(e) }}>OK</button> */}
            {
                arrayLength > 0 ? (
                    <>
                        <label>The elements in array that you want to sort:</label>
                        <br />
                        <span className="error-msg">{error}</span>
                        {
                            renderInputs()
                        }
                        <button onClick={(e) => { onSubmit(e) }} disabled={isLoading}>Show answer</button>
                    </>
                ) : null
            }


        </div>

    )
}
);


export default InterviewUI;