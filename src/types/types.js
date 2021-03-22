

export const algoritmos = [
    {
        key: 1,
        nombre: 'Algoritmo Basado en Contenido (CB)',
        abrev: 'cb',
        desc: 'Método que estima el rating mediante la similitud coseno entre el perfil de usuario y los ítems.'
    },
    {
        key: 2,
        nombre: 'Algoritmo Híbrido Basado en Usuarios (CBUB)',
        abrev: 'cbub',
        desc: 'Método que estima el rating mediante la similitud coseno entre el perfil de usuario y los ítems.'
    },
    {
        key: 3,
        nombre: 'Algoritmo Híbrido Basado en Ítems (CBIB)',
        abrev: 'cbib',
        desc: 'Método que estima el rating mediante la similitud coseno entre el perfil de usuario y los ítems.'
    },
    {
        key: 4,
        nombre: 'Algoritmo K-Nearest Neighbor Basado en Usuarios (KNN-U)',
        abrev: 'knn-u',
        desc: 'Método que busca en las observaciones más cercanas a la que se está tratando de predecir y clasificar el punto de interés basado en la mayoría de datos que lo rodean.'
    }, {
        key: 5,
        nombre: 'Algoritmo K-Nearest Neighbor Basado en Ítems (KNN-I)',
        abrev: 'knn-i',
        desc: 'Método que busca en las observaciones más cercanas a la que se está tratando de predecir y clasificar el punto de interés basado en la mayoría de datos que lo rodean.'
    },
    {
        key: 6,
        nombre: 'Algoritmo RND',
        abrev: 'rnd',
        desc: 'Método que genera puntajes aleatorios para cada par de usuario-ítem'
    }
]