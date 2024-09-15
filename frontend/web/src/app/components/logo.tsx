import * as React from 'react';

interface IProps {
}

export default class Logo extends React.Component<IProps, {}> {
    render() {
        return (
            <div className=" p-10">
                <nav className="navbar navbar-default display-block">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img src="../icon.png" alt="autoM8 logo"></img>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
