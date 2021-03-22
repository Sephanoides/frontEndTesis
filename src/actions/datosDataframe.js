import { reduxState } from "../types/redux-state"


export const datosDataframe = (usuarios, items, aspectos,PR) => ({

    type: reduxState.dataset,
    payload: {
        usuarios: usuarios,
        items: items,
        aspectos: aspectos,
        PR
    }
})