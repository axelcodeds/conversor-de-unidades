import { useState } from 'react'

import './App.css'

const conversionRates = {
    metros: {
        metros: 1,
        kilometros: 0.001,
        millas: 0.000621371,
        centimetros: 100
    },
    kilometros: {
        metros: 1000,
        kilometros: 1,
        millas: 0.621371,
        centimetros: 100000
    },
    millas: {
        metros: 1609.34,
        kilometros: 1.60934,
        millas: 1,
        centimetros: 160934
    },
    centimetros: {
        metros: 0.01,
        kilometros: 0.00001,
        millas: 0.0000062137,
        centimetros: 1
    }
}

function App() {
    const [value1, setValue1] = useState('1000')
    const [value2, setValue2] = useState('1')
    const [unit1, setUnit1] = useState('metros')
    const [unit2, setUnit2] = useState('kilometros')

    const isNumeric = value => {
        // Valida números enteros y flotantes, incluyendo negativos
        return /^-?\d*\.?\d*$/.test(value)
    }

    const handleUnit = (event, setUnit, unit, setValue, value) => {
        const prevUnit = unit
        const newUnit = event.target.value
        setUnit(newUnit)

        const num = parseFloat(value)
        const conversionRate = conversionRates[prevUnit][newUnit]
        const convertedValue = num * conversionRate
        if (!isNaN(convertedValue)) {
            setValue(convertedValue.toFixed(2))
        }
    }

    const handleValue = (event, setInput, setOutput, unitIn, unitOut) => {
        const { value } = event.target

        if (isNumeric(value)) {
            setInput(value)
            const num = parseFloat(value)
            const conversionRate = conversionRates[unitIn][unitOut]
            const convertedValue = num * conversionRate
            if (!isNaN(convertedValue)) {
                setOutput(convertedValue.toFixed(2))
            }
        }
    }

    return (
        <div className='container'>
            <h1 className='title'>Conversor de unidades</h1>
            <div className='input'>
                <div className='input-item'>
                    <input
                        type='text'
                        value={value1}
                        onInput={e =>
                            handleValue(e, setValue1, setValue2, unit1, unit2)
                        }
                    />
                    <select
                        value={unit1}
                        onChange={e =>
                            handleUnit(e, setUnit1, unit1, setValue1, value1)
                        }
                    >
                        <option value='metros'>metros</option>
                        <option value='kilometros'>kilometros</option>
                        <option value='millas'>millas</option>
                        <option value='centimetros'>centímetros</option>
                    </select>
                </div>
                <div className='separator'>=</div>
                <div className='input-item'>
                    <input
                        type='text'
                        value={value2}
                        onInput={e =>
                            handleValue(e, setValue2, setValue1, unit2, unit1)
                        }
                    />
                    <select
                        value={unit2}
                        onChange={e =>
                            handleUnit(e, setUnit2, unit2, setValue2, value2)
                        }
                    >
                        <option value='metros'>metros</option>
                        <option value='kilometros'>kilometros</option>
                        <option value='millas'>millas</option>
                        <option value='centimetros'>centímetros</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default App
