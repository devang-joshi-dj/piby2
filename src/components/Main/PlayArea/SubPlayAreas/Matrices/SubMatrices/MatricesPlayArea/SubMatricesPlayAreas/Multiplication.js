import React, { useState, useEffect } from 'react';
import Input from '../../../../Assets/Input/Input';
import Radio from '../../../../Assets/Radio/Radio';
import Matrix from '../Matrix/Matrix';
import Select from 'react-select';

const Multiplication = props => {
    const { matrix, rowsSelectedValue, columnsSelectedValue } = props;
    const [secondMatrix, setSecondMatrix] = useState([]);
    const [multiplicationOption, setMultiplicationOption] = useState('Constant');
    const [constantValue, setConstantValue] = useState(0);
    const options = ['Constant', 'Matrix'];
    const [finalInitialMatrix, setFinalInitialMatrix] = useState([]);
    const [secondMatrixColumnsSelectedValue, setSecondMatrixColumnsSelectedValue] = useState();

    useEffect(() => {
        // function to set finalMatrix when matrix structure gets changed

        switch (multiplicationOption) {
            case 'Constant':
                return rowsSelectedValue && columnsSelectedValue ?
                    (
                        setFinalInitialMatrix(
                            Array.from(
                                { length: rowsSelectedValue }, () =>
                                Array.from(
                                    { length: columnsSelectedValue },
                                    () => null
                                )
                            )
                        )
                    ) :
                    null
            case 'Matrix':
                return rowsSelectedValue && secondMatrixColumnsSelectedValue ?
                    (
                        setFinalInitialMatrix(
                            Array.from(
                                { length: rowsSelectedValue }, () =>
                                Array.from(
                                    { length: secondMatrixColumnsSelectedValue },
                                    () => null
                                )
                            )
                        )
                    ) :
                    null
            default:
                return null;
        }
    }, [multiplicationOption,
        rowsSelectedValue,
        columnsSelectedValue,
        secondMatrixColumnsSelectedValue])

    // useEffect(() => {
    //     console.log(secondMatrix)
    // }, [secondMatrix])

    useEffect(() => {
        // function to set constantValue to zero and secondMatrixColumnsSelectedValue to null if there is a change in multiplicationOption

        setConstantValue(0);
        setSecondMatrixColumnsSelectedValue();
    }, [multiplicationOption]);

    const renderInput = () => {
        // function to render Input when multiplicationOption is set accordingly

        switch (multiplicationOption) {
            case 'Constant':
                return (
                    <>
                        <Input setValue={setConstantValue} filter={true}>
                            Input your Constant:
                        </Input>
                    </>
                );
            case 'Matrix':
                const options = [
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' },
                ];

                const handleSecondValueChange = e => {
                    // function to handle the value when the value is changed in select component

                    setSecondMatrixColumnsSelectedValue(e.value);
                }

                return (
                    <>
                        <div className="matrices-input">
                            <div className="label">Specify the Order of the Matrix:</div>
                            <div className="label">{columnsSelectedValue}</div>
                            <div className="symbol">X</div>
                            <Select
                                id="select"
                                options={options}
                                value={options.find(obj => obj.value === secondMatrixColumnsSelectedValue)}
                                onChange={handleSecondValueChange}
                            />
                        </div>
                        {
                            secondMatrixColumnsSelectedValue ?
                                (
                                    <div className="matrix-input">
                                        <div className="label">
                                            Input your 2nd Matrix:
                                        </div>
                                        <Matrix
                                            matrix={secondMatrix}
                                            setMatrix={setSecondMatrix}
                                            rowsSelectedValue={columnsSelectedValue}
                                            columnsSelectedValue={secondMatrixColumnsSelectedValue}
                                        />
                                    </div>
                                ) :
                                null
                        }
                    </>
                );
            default:
                return null;
        }
    }

    const getMatrixMultiplication = () => {
        // function to get complements of firstFinalSetArray and secondFinalSetArray

        const PrintConstantToMatrixMultiplication = () => {
            // function to print Constant To Matrix Multiplication

            let finalMatrix;
            for (let i = 0; i < rowsSelectedValue; i++)
                for (let j = 0; j < columnsSelectedValue; j++) {
                    finalMatrix = finalInitialMatrix;
                    finalMatrix[i][j] = Number(matrix[i][j]) * constantValue;
                }

            return (
                <>
                    <div className="result">
                        <div className="label">
                            kXA:
                        </div>
                        <div className="print-matrix">
                            {
                                <div className="print-matrix-row">
                                    {
                                        finalMatrix.map((row, rowIndex) => (
                                            <div key={rowIndex} className="print-matrix-column">
                                                {row.map((column, columnIndex) => (
                                                    <div key={columnIndex}>
                                                        {finalMatrix[rowIndex][columnIndex]}
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </>
            );
        }

        const PrintMatrixToMatrixMultiplication = () => {
            // function to print Matrix To Matrix Multiplication

            // let finalMatrix = finalInitialMatrix;
            // for (let i = 0; i < rowsSelectedValue; i++) {
            //     let cal = 0;
            //     for (let j = 0; j < columnsSelectedValue; j++) {
            //         for (let k = 0; k < secondMatrixColumnsSelectedValue; k++) {
            //             cal += Number(matrix[j][k]) * Number(secondMatrix[k][j]);
            //             finalMatrix[k][j] = cal
            //         }
            //     }
            // }

            // return (
            //     <>
            //         {
            //             secondMatrix.length &&
            //                 secondMatrix.length === Number(columnsSelectedValue) ?
            //                 <div className="result">
            //                     <div className="label">
            //                         AXB:
            //                     </div>
            //                     <div className="print-matrix">
            //                         {
            //                             <div className="print-matrix-row">
            //                                 {
            //                                     finalMatrix.map((row, rowIndex) => (
            //                                         <div key={rowIndex} className="print-matrix-column">
            //                                             {row.map((column, columnIndex) => (
            //                                                 <div key={columnIndex}>
            //                                                     {finalMatrix[rowIndex][columnIndex]}
            //                                                 </div>
            //                                             ))}
            //                                         </div>
            //                                     ))
            //                                 }
            //                             </div>
            //                         }
            //                     </div>
            //                 </div>
            //                 : null
            //         }
            //     </>
            // );

            return (
                <>
                </>
            );
        }

        const renderMultiplication = () => {
            switch (multiplicationOption) {
                case 'Constant':
                    return <PrintConstantToMatrixMultiplication />
                case 'Matrix':
                    return secondMatrixColumnsSelectedValue &&
                        secondMatrix.length &&
                        secondMatrix.length === Number(columnsSelectedValue) ?
                        <PrintMatrixToMatrixMultiplication /> :
                        null
                default:
                    return null;
            }
        }

        return (
            <>
                <div className="info">
                    What would you do multiplication with?
                </div>
                <Radio
                    radioOptions={options}
                    radioName="multiplication-options"
                    radioOption={multiplicationOption}
                    setOption={setMultiplicationOption}
                />
                {renderInput()}

                {
                    matrix.length &&
                        finalInitialMatrix.length &&
                        matrix.length === Number(rowsSelectedValue) &&
                        finalInitialMatrix.length === Number(rowsSelectedValue) ?
                        renderMultiplication()
                        : null
                }
            </>
        );
    }

    return (
        <>
            <div className="multiplication">
                <h2>Multiplication</h2>
                {getMatrixMultiplication()}
            </div>
        </>
    );
}

export default Multiplication;