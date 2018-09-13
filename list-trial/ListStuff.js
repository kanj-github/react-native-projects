import React, { PureComponent, Component } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';

import styles from './Styles.js';

class SelectableListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.text);
    };

    render() {
        let radioStyle;
        if (this.props.selected) {
            radioStyle = [styles.radioStyle, styles.radioActiveStyle];
        } else {
            radioStyle = styles.radioStyle;
        }
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.itemRowStyle}>
                    <View style={radioStyle} />
                    <Text style={styles.itemTextStyle} numberOfLines={1}> {this.props.text} </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class StringList extends Component {

    constructor(props) {
        super(props);

        this.state = { selections: new Set([]) };

        props.callback(this);
    }

    select = (selections) => {
        this.setState(previousState => {
            return { selections }
        });
    }

    _onPressItem = (str) => {
        this.setState((state) => {
            if (state.selections.has(str)) {
                state.selections.delete(str);
            } else {
                state.selections.add(str);
            }
            this.props.window.onSelectionUpdated(state.selections);
            return state;
        });
    };

    _renderItem = ({ item }) => {
        if (this.props.selectable) {
            return (
                <SelectableListItem
                    onPressItem={this._onPressItem}
                    selected={this.state.selections.has(item.key)}
                    text={item.key}
                />
            );
        } else {
            return (
                <View style={styles.itemRowStyle}>
                    <Text style={styles.itemTextStyle} numberOfLines={1}> {item.key} </Text>
                </View>
            );
        }
    };

    render() {

        if (!this.props.selectable) {
            this.state.selections.clear();
        }

        return (
            <FlatList
                data={this.props.data}
                extraData={this.state}
                renderItem={this._renderItem}
            />
        );
    }
}

module.exports = StringList;
