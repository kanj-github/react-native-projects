import React, { Component } from 'react';
import { View, Button } from 'react-native';

import styles from './Styles.js';

class BottomBar extends Component {

    constructor(props) {
        super(props);

        this.state = {deleteAllowed: false};
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onSelectAllClicked = this.onSelectAllClicked.bind(this);

        props.callback(this);
    }

    render() {
        let rightButton;
        if (this.state.deleteAllowed) {
            rightButton = <Button onPress={this.onDeleteClicked} title="Delete" color="red" />
        } else {
            rightButton = <Button onPress={() => { }} title="Delete" color='mistyrose' />
        }

        return (
            <View style={[styles.barsStyle, styles.bottomBarStyle]}>
                <Button onPress={this.onSelectAllClicked} title="Select All" />
                {rightButton}
            </View>
        );
    }

    onDeleteClicked() {
        this.props.window.handleDeleteClick();
    }

    onSelectAllClicked() {
        this.props.window.handleSelectAllClick();
    }
}

module.exports = BottomBar;
