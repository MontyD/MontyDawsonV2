import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './home';
import { Header } from './header';
import { FourZeroFour } from './four-zero-four';

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route component={FourZeroFour} />
                </Switch>
            </>
        );
    }
}
