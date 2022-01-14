import React from 'react'
import { Gasto } from './Gasto'

export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
    return (
        <div className='listado-gastos contenedor'>

            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
                        {gastosFiltrados.map(gasto => (
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                eliminarGasto={eliminarGasto}
                                setGastoEditar={setGastoEditar}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
                        {gastos.map(gasto => (
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                eliminarGasto={eliminarGasto}
                                setGastoEditar={setGastoEditar}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}
