import React from 'react'

export const TableRow = React.memo(({ array }) => {
    
    return (
        <tr key={array[0]}>

            <td>  {array[1]}</td>
            <td > {array[2]}</td>
            <td > {array[3]}</td>
            <td > {array[4]}</td>

        </tr>
    )
})
