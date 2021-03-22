import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { AlgoritmosScreen } from '../components/algo/AlgoritmosScreen';

export const AppRoute = () => {
    return (
        <Router >
            <div>
                <Switch>
                    <Route exact path="/" component={AlgoritmosScreen} />
                    <Redirect to="/" component={AlgoritmosScreen}/>
                </Switch>
            </div>
        </Router>
    )
}
