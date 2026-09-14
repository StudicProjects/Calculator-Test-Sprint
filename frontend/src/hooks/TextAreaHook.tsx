import { useState } from "react";

export interface TextAreaHook {
    expression: string;
    setExpression: (expression: string) => void;
    handleCalculateClick: () => void;
    setResultIfNotNull: (result: string | number | undefined) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNumberClick: (symbol: string) => void;
    onOperationClick: (oper: string) => void;
    onACClick: () => void;
    onDeleteClick: () => void;
    onHistoryElementSet: (clickedText: string) => void; // Перевести на SuccesExpression | ErrorExpression
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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        function isOperation(char: string): boolean {
            return ['+', '-', '*', '/', '^', '%'].includes(char);
        }

        const newExp = event.target.value;
        const lastSymbol = newExp[newExp.length - 1];
        if (newExp.length == expression.length + 1 && isOperation(lastSymbol)) {
            setExpression(expression + (expression.endsWith(' ') ? "" : " ") + lastSymbol + " ");
        }
        else
            setExpression(event.target.value);
    };

    function onNumberClick(symbol: string) {
        setExpression(expression + symbol);
    };

    function onOperationClick(oper: string) {
        setExpression(expression + " " + oper + " ");
    };

    function onACClick() {
        setExpression("");
    };

    function onDeleteClick() {
        if (expression.endsWith(' ')) {
            setExpression(expression.slice(0, -3));
        } else {
            setExpression(expression.slice(0, -1));
        }
    };

    function onHistoryElementSet(clickedText: string) {
        if (expression !== '') setExpression(expression + ' ')
        setExpression(expression + clickedText);
    }

    return {
        expression,
        setExpression,
        handleCalculateClick,
        setResultIfNotNull,
        handleChange,
        onNumberClick,
        onOperationClick,
        onACClick,
        onDeleteClick,
        onHistoryElementSet
    } as TextAreaHook;
}