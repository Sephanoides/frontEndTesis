import React from 'react'
import { Lottie } from '@crello/react-lottie'
// import * as loading from './pinjump.json'
// import * as elefante from '../../animations/elefante.json'
import * as progressBar from '../../animations/progress-bar.json'

import './loading.css'

export const Loading = () => {
    return (
        <div className="loading">
            <p>Esto puede demorar varios minutos, dependiendo el/los algoritmo(s), y el tamaño del conjunto de datos.</p>
            <Lottie
                width={400}
                height={400}
                className="lottie-container basic"
                config={{ animationData: progressBar.default, loop: true, autoplay: true }}
            />
        </div>

    )
}
