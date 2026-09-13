import { useState } from "react";

export interface TextAreaHook {
    expression: string;
    setExpression: (expression: string) => void;
    handleCalculateClick: () => void;
    setResultIfNotNull: (result: string | number | undefined) => void;
    onNumberClick: (symbol: string) => void;
    onOperationClick: (oper: string) => void;
    onACClick: () => void;
    onDeleteClick: () => void;
}

export function useTextArea(onCalculate: (expression: string) => void) {

    const [expression, setExpression] = useState('');

    function handleCalculateClick() {
        if (!expression.trim()) {
            alert("Поле ввода пустое! Введите математическое выражение.");
            return;
        }

        onCalculate(expression);
    }

    function setResultIfNotNull(result: string | number | undefined) {
        if (result === undefined || result == null)
            return;

        setExpression(expression + " " + "=" + " " + String(result));
    }

    // - - -

    function onNumberClick(symbol: string) {
        setExpression(expression + symbol);
    };

    function onOperationClick(oper: string) {
        setExpression(expression + " " + oper + " ");
    };

    function onACClick() {
        setExpression("");
    };

    const onDeleteClick = () => {
        if (expression.endsWith(' ')) {
            setExpression(expression.slice(0, -3));
        } else {
            setExpression(expression.slice(0, -1));
        }
    };

    return {
        expression,
        setExpression,
        handleCalculateClick,
        setResultIfNotNull,
        onNumberClick,
        onOperationClick,
        onACClick,
        onDeleteClick
    } as TextAreaHook;
}