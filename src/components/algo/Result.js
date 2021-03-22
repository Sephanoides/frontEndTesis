import React from 'react'

import './estilos.css'
import { TableRow } from './TableRow';
import { useSelector } from 'react-redux'

export const Result = ({ data }) => {
    const { PR } = useSelector(state => state.algoritmos)

    return (
        <div className="animate__animated animate__fadeIn">
            <h1>Tabla de resultados</h1>
            <div className="table-responsive-sm w-100 ">
                <table className="table bg-light rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th>Método</th>
                            <th>{`P@${PR}`}</th>
                            <th>{`R@${PR}`}</th>
                            <th>Tiempo</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(array => (
                                <TableRow key={array[0]} array={array} />
                            ))
                        }

                    </tbody>
                </table>

               
            </div>

        </div>

    )
}
