import React, { useState } from 'react'
import { Box, Container, Grid, makeStyles, Checkbox, FormControlLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { algoritmos } from '../../types/types'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchSinToken } from '../../helpers/useFetch';
import { useForm } from '../../hooks/useForm';
import { Loading } from '../ui/Loading';
import { Result } from './Result';

import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { datosDataframe } from '../../actions/datosDataframe';
import { ListItems } from './ListItems';
import { Timer } from '../ui/Temporizador';



// import { DataTable } from './MaterialTable';

export const AlgoritmosScreen = () => {

    const [formatTime, handleStart, handlePause, handleReset] = Timer([]);

    const history = useHistory()
    const dispatch = useDispatch();

    const classes = styles();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
    const [dataFrame, setDataFrame] = useState(null);
    const [config, setConfig] = useState({
        pr: '5',
        vecinos: '5',
        testSize: '0.2'

    })

    const { pr, vecinos, testSize } = config
    const [values, handleInputChange, quitarElemento] = useForm([])
    const endpoint = process.env.REACT_APP_FETCH_ALGO

    const handleForm = async (e) => {
        e.preventDefault();

        if (values.length > 0) {
            if (dataFrame) {
                try {

                    handleReset()
                    handleStart()
                    setLoading(true);

                    const form = new FormData();
                    form.append('csvFile', dataFrame);
                    form.append('algoritmos', values);
                    form.append('pr', pr);
                    form.append('vecinos', vecinos);
                    form.append('test', testSize)


                    const res = await fetchSinToken(endpoint, form, 'POST');

                    const { ok, data, iua } = await res.json();
                    if (ok) {
                        console.log(data);

                        const { users, items, aspects } = iua
                        setLoading(false);
                        setData(data);

                        dispatch(datosDataframe(users, items, aspects, pr));
                        handlePause()

                    } else {
                        handleReset()
                        setLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el formato del documento',
                            text: data
                        })
                    }


                } catch (error) {

                    handleReset()
                    console.log(error);
                    setLoading(false);

                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No es posible realizar el experimento',
                    text: 'No se ha cargado ningún conjunto de datos'

                })
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: '¡ hey!',
                text: 'Por favor seleccione al menos un algoritmo para la experimentación.',

            })
            setLoading(false);
        }

    }

    const handleChange = (event) => {

        if (event.target.type === 'file') {

            const extPermitidas = /(.csv)$/i;
            if (!extPermitidas.exec(event.target.value)) {

                Swal.fire({
                    icon: 'error',
                    title: 'extensión inválida',
                    text: 'Solo se permite formato .csv'
                })

            } else {
                setDataFrame(event.target.files[0]);
                // console.log(event.target.files[0]['name'])
            }

        }

        if (event.target.checked) {
            handleInputChange(event);

        } else {
            quitarElemento(event);
        }
    };

    const handleCancel = () => {

        history.go(0)
    }

    const handleConfiguration = ({ target }) => {

        setConfig({
            ...config,
            [target.name]: target.value
        })

        // setPR(target.value)

    }

    return (
        <>
            <Container maxWidth="lg" style={{marginTop:40}} className="animate__animated animate__fadeIn">
                <Grid container spacing={6} c >
                    <Grid item xs={5}>
                        <form onSubmit={handleForm}>
                            <Box className={classes.form}
                                boxShadow={3}
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                            >
                                <Typography variant="h3" gutterBottom mb={2}>
                                    Experimentos
                                </Typography>

                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignContent="space-between"
                                    width="100%"
                                    height="100%"
                                    mb={2}
                                >
                                    {
                                        dataFrame ?
                                            (
                                                <Alert className="animate__animated animate__fadeInDown"
                                                    variant="filled" severity="success">{dataFrame ? dataFrame['name'] : ''}</Alert>
                                            )
                                            :
                                            (
                                                ''
                                            )
                                    }


                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignContent="space-between"
                                    width="100%"
                                    height="100%"
                                    mb={2}
                                >

                                    {
                                        algoritmos.map(({ nombre, abrev, key }) => (
                                            <FormControlLabel
                                                key={key}
                                                control={
                                                    <Checkbox
                                                        className={classes.checkbox}
                                                        value={abrev}
                                                        onChange={handleChange}
                                                        name={abrev}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />}
                                                label={nombre}

                                            />
                                        ))
                                    }
                                    <div className="form-group">
                                        <label htmlFor="PR">Precision@n - Recall@n </label>
                                        <select name="pr" className="form-control" id="PR" onChange={handleConfiguration}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vecinos">Número de vecinos</label>
                                        <input type="number" defaultValue="5" className="form-control" id="vecinos" aria-describedby="vecinos" placeholder="5" min="5" max="40" name="vecinos" onChange={handleConfiguration} />
                                        <small id="vecinos" className="form-text text-muted">Min. 5 , Max. 40</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="testSize">Tamaño del conjunto de test</label>
                                        <input type="number" step="0.01" defaultValue="0.2" className="form-control" id="testSize" aria-describedby="test" placeholder="0,2" min="0.2" max="0.5" name="testSize" onChange={handleConfiguration} />
                                        <small id="test" className="form-text text-muted">Min. 0,2 , Max. 0,5</small>
                                    </div>

                                </Box>



                                <Button
                                    type="submit"
                                    className={classes.button}
                                    color="primary"
                                    variant="contained"
                                ><span><i className="fas fa-flask"></i> Realizar experimento</span>
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    component="label"
                                    color="primary"

                                >
                                    <span><i className="fas fa-upload"></i> Cargar Dataset</span>
                                    <input

                                        type="file"
                                        name="file"
                                        hidden
                                        onChange={handleChange}
                                    />


                                </Button>
                                <Button
                                    className={classes.button}
                                    color="secondary"
                                    variant="outlined"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </form>
                    </Grid>

                    <Grid item xs={7} >
                        <Box display="flex" flexDirection="column" alignItems="flex-end" >

                            {
                                loading ?
                                    (
                                        <Loading />
                                    )
                                    :
                                    data ?
                                        (
                                            <div className="w-100 ml-5 ">
                                                <Result data={data} />
                                                <div className="d-flex flex-row align-items-center justify-content">
                                                    <ListItems />
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="w-100">
                                                <p>- Seleccione uno o más algoritmos para experimentación. </p>
                                                <p>- El conjunto de datos adjunto debe ser de extensión .CSV</p>
                                                <p>- El formato es : user_id, item_id, rating, aspecto1, aspecto2, . . . , aspectoN</p>
                                                <p>- Los valores de los aspectos deben ser -1, 0 o 1, siendo estos calculados con algún algoritmo para obtener polaridades de aspectos</p>

                                            </div>

                                        )
                            }

                        </Box>
                        <Box>
                            <h3 className="mt-5 ml-0">Tiempo total del experimento {formatTime}</h3>
                        </Box>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}




const styles = makeStyles((theme) => ({
    root: {
        minWidth: 250,
        maxWidth: 500,
        backgroundColor: "#fff",
        marginTop: 57

    },
    title: {
        fontSize: 8,
    },
    box: {
        marginBottom: '80px',

    },
    form: {
        backgroundColor: '#eaeaea',
        borderRadius: '8px',
        padding: '50px',
        color: 'black'


    },
    button: {
        marginTop: '5px',
        width: '100%'

    },
    checkbox: {
        color: '#393e46',
    },

}))
