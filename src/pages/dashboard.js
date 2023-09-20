/* eslint-disable no-useless-escape */
import React, { useRef, useState } from "react";
import ReactDOMServer from 'react-dom/server';

import { Select, Tag } from "antd";

const globalOption = [
    { id: 1, label: "People Value", value: 10 },
    { id: 2, label: "Employee Text", value: 20 },
    { id: 3, label: "Employee Salary", value: 30 },
];

export default function DashboardPage(params) {
    const [showMenu, setShowMenu] = useState(false);
    const editableDiv = useRef();
    const selectElement = useRef();

    const [options, setOptions] = useState(globalOption);

    return (
        <>
            <div className="flex flex-col w-full min-h-screen items-center justify-center">
                <div className="flex flex-col items-center justify-center border border-solid border-black rounded-sm w-full max-w-4xl p-2 relative">
                    <div
                        id='editElement'
                        className="h-6 w-full focus:border-none focus:outline-none z-[1000]"
                        ref={editableDiv}
                        contentEditable
                        onInput={(e) => {
                            const regex = /[\+\-\*\/\%\^]/g;
                            const text = e.target.innerText.toString().split(regex).pop().toString().trim();
                            if (text !== "") {
                                setOptions((_) => {
                                    return [
                                        ...globalOption.filter((item) => {
                                            return item.label.includes(text);
                                        }),
                                    ];
                                });
                                setShowMenu(true);
                            } else {
                                setShowMenu(false);
                            }
                        }}
                        onKeyDown={(event) => {
                            if (event.keyCode === 40) {
                                selectElement.current.focus();
                            }
                        }}
                    >

                    </div>
                    <div className="w-full h-full absolute bottom-0 left-0 z-50 bg-white"></div>
                    <Select
                        ref={selectElement}
                        style={{
                            width: "100%",
                            position: "absolute",
                            bottom: "0px",
                            left: "0px",
                            zIndex: 0,
                        }}
                        options={options}
                        onSelect={(val, option) => {
                            const nodeString = ReactDOMServer.renderToString(<Tag className="m-0" contentEditable={false}>{option.label}</Tag>);

                            const htmlNodeString = document.getElementById('editElement').innerHTML.toString();
                            let lastIndex = htmlNodeString.lastIndexOf("+");
                            lastIndex = (lastIndex < htmlNodeString.lastIndexOf("-")) ? htmlNodeString.lastIndexOf("-") : lastIndex;
                            lastIndex = (lastIndex < htmlNodeString.lastIndexOf("*")) ? htmlNodeString.lastIndexOf("*") : lastIndex;
                            lastIndex = (lastIndex < htmlNodeString.lastIndexOf("/")) ? htmlNodeString.lastIndexOf("/") : lastIndex;
                            if (lastIndex) document.getElementById('editElement').innerHTML = htmlNodeString.substring(0, lastIndex + 1);

                            const node = document.createElement('span');
                            node.innerHTML = nodeString;
                            node.contentEditable = false

                            document.getElementById('editElement').appendChild(node);
                            editableDiv.current.focus();
                            setShowMenu(false);

                        }}
                        open={showMenu}
                        showArrow={false}
                    />
                </div>
            </div>
        </>
    );
}
