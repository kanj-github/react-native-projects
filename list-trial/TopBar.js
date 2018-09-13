import React, { Component } from 'react';
import { View, Button } from 'react-native';

import styles from './Styles.js';

class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = { editing: false };
        this.onEditClicked = this.onEditClicked.bind(this);
        this.onCancelEditClicked = this.onCancelEditClicked.bind(this);
        this.onAddClicked = this.onAddClicked.bind(this);
    }

    render() {
        let leftButton;
        if (this.state.editing) {
            leftButton = <Button onPress={this.onCancelEditClicked} title="Cancel" />
        } else {
            leftButton = <Button onPress={this.onEditClicked} title="Edit" />
        }

        let rightButton;
        if (this.state.editing) {
            rightButton = <Button onPress={() => { }} title="Add" color='cadetblue' />
        } else {
            rightButton = <Button onPress={this.onAddClicked} title="Add" />
        }

        return (
            <View style={[styles.barsStyle, styles.topBarStyle]}>
                {leftButton}
                {rightButton}
            </View>
        );
    }

    onEditClicked() {
        this.props.window.setState(previousState => {
            previousState.topBarSettings.editing = true;
            return previousState;
        });
        this.setState(previousState => {
            return { editing: true };
        })
    }

    onCancelEditClicked() {
        this.props.window.setState(previousState => {
            previousState.topBarSettings.editing = false;
            return previousState;
        });
        this.setState(previousState => {
            return { editing: false };
        })
    }

    onAddClicked() {

    }
}

module.exports = TopBar;
