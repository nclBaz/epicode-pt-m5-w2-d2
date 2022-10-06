import React, { Component } from "react";
import Header from './components/Header';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => <div className="App"></div>;

class App extends Component {
    render() {
        const title = "WD-May22 PT01";

        return (
            <React.Fragment>
                <Header title={title} />
                <Main />
            </React.Fragment>
        );
    };
};

export default App;
