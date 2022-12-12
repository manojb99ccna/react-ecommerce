import React from 'react';
import Emitter from '../Events/Emitter';
import EventName from '../Events/EventName';
import { Spinner } from 'react-bootstrap';

class LoaderFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        Emitter.on(EventName.GLOBAL_LOADER.SHOW, (object) => {
            this.setState({ show: true });
        });

        Emitter.on(EventName.GLOBAL_LOADER.HIDE, (object) => {
            this.setState({ show: false });
        });
    }

    render() {

        if (this.state.show) {
            return <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0 , 0, 0.06)', zIndex: 10000000 }}>
                <div className='loading--spinner'>
                    <Spinner animation="border" variant="primary" />
                </div>
            </div>;
        }

        return <></>
    }

}

export default LoaderFrame;
