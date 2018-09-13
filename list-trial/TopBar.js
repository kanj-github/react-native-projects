import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';

import styles from './Styles.js';

class TopBar extends PureComponent {

    render() {
        let leftButton;
        if (this.props.editing) {
            leftButton = <Button onPress={this.props.onEditCancel} title="Cancel" />
        } else if (this.props.editEnabled) {
            leftButton = <Button onPress={this.props.onEditStart} title="Edit" />
        } else {
            leftButton = <Button onPress={() => { }} title="Edit" color='cadetblue' />
        }

        let rightButton;
        if (this.props.editing) {
            rightButton = <Button onPress={() => { }} title="Add" color='cadetblue' />
        } else {
            rightButton = <Button onPress={this.props.onAdd} title="Add" />
        }

        return (
            <View style={[styles.barsStyle, styles.topBarStyle]}>
                {leftButton}
                {rightButton}
            </View>
        );
    }
}

module.exports = TopBar;
