import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';

import TopBar from './TopBar.js';
import BottomBar from './BottomBar.js';
import StringList from './ListStuff.js';

class Window extends Component {

    constructor(props) {
        super(props);

        this.state = { topBarSettings: { editing: false } };
        this.onSelectionUpdated = this.onSelectionUpdated.bind(this);
        this.setDeleteAllowed = this.setDeleteAllowed.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this._setBottomBarCallback = this._setBottomBarCallback.bind(this);
        this._setListCallback = this._setListCallback.bind(this);
    }

    render() {

        let bottomBar;
        if (this.state.topBarSettings.editing) {
            bottomBar = <BottomBar
                window={this}
                callback = {this._setBottomBarCallback}
            />;
        } else {
            bottomBar = "";
        }

        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'stretch',
            }}>
                <TopBar window={this} />
                <StringList
                    window = {this}
                    callback = {this._setListCallback}
                    data = {[{key: 'Devin'}, {key: 'Jackson'}, {key: 'James'}, {key: 'Joel'}, {key: 'John'}, {key: 'Jillian'}, {key: 'Jimmy'}, {key: 'Julie'},]}
                    selectable = {this.state.topBarSettings.editing}
                />
                {bottomBar}
            </SafeAreaView>
        );
    }

    onSelectionUpdated(selections) {

        if (selections.size > 0) {
            this.setDeleteAllowed(true);
        } else {
            this.setDeleteAllowed(false);
        }
    }

    setDeleteAllowed(allowed) {
        this.bottomBar.setState(previousState => {
            previousState.deleteAllowed = allowed;
            return previousState;
        });
    }

    handleDeleteClick() {

    }

    handleSelectAllClick() {
        this.list.selectAll();
        this.setDeleteAllowed(true);
    }

    _setListCallback(list) {
        this.list = list;
    }

    _setBottomBarCallback(bottomBar) {
        this.bottomBar = bottomBar;
    }
}

export default class App extends React.Component {
    render() {
        return (
            <Window />
        );
    }
}
