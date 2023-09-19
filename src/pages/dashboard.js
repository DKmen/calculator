/* eslint-disable no-eval */
import { useState } from "react";
import { useSelector } from "react-redux";


export default function DashboardPage() {
    const [showOption, setShowOption] = useState(false);
    const [optionValue, setOptionValue] = useState("");
    const option = useSelector((state) => state.keys.keys);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(0);


    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-2">
            <div className="flex flex-row items-center justify-center space-x-2 w-full max-w-4xl">
                <div
                    id="value"
                    className="w-full max-w-4xl h-10 border border-solid border-black p-2"
                    contentEditable
                    onKeyDown={(event) => {
                    }}
                    onInput={(event) => {
                        if (event.target.innerText.includes('@')) {
                            setShowOption(true);
                            const option = event.target.innerText.split('@')[event.target.innerText.split('@').length - 1];
                            setOptionValue(option);
                        }
                    }}
                ></div>
                <button className="text-white bg-blue-700 rounded p-2 text-base" onClick={() => {
                    let mathString = document.getElementById('value').innerText;
                    option.forEach((item) => {
                        mathString = mathString.replace(item.title, item.value);
                    })
                    mathString = mathString.replace(" ", "");
                    setResult(eval(mathString))
                    setShowResult(true);
                    setTimeout(() => {
                        setShowResult(false);
                        document.getElementById('value').innerHTML = ""

                    }, 10000)
                }}>Calculate</button>
            </div>
            <div className="flex flex-col w-full max-w-4xl p-2 items-start justify-between">
                {showOption && option.filter((txt) => {
                    return optionValue === '' ? true : txt.title.includes(optionValue.substring(1))
                }).map((txt) => {
                    return (
                        <span
                            className="text-base font-semibold cursor-pointer"
                            onClick={() => {
                                const spanChild = document.createElement('span');
                                spanChild.className = "px-2 py-1 mx-1 rounded-full bg-slate-400 text-white"
                                spanChild.innerText = txt.title
                                spanChild.id = txt.id
                                spanChild.contentEditable = false
                                const index = document.getElementById('value').innerHTML.indexOf('@');
                                document.getElementById('value').innerHTML = document.getElementById('value').innerHTML.substring(0, index);
                                document.getElementById('value').appendChild(spanChild);
                                setOptionValue('');
                                setShowOption(false);
                            }}
                        >
                            {txt.title}
                        </span>
                    );
                })}
            </div>
            {showResult && <span className="text-2xl font-semibold">{result}</span>}
        </div>
    );
}
