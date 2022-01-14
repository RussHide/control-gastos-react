import React from 'react'
import { ControlPresupuesto } from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ setGastos, gastos, presupuesto, setPresupuesto, setIsValidPresupuesto, isValidPresupuesto }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>
            {
                isValidPresupuesto ?
                    <ControlPresupuesto setIsValidPresupuesto={setIsValidPresupuesto} setPresupuesto={setPresupuesto} setGastos={setGastos} presupuesto={presupuesto} gastos={gastos} />
                    : <NuevoPresupuesto
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setIsValidPresupuesto={setIsValidPresupuesto} />
            }
        </header>
    )
}

export default Header
