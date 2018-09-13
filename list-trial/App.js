import React, { Component } from 'react';
import { SafeAreaView, AlertIOS, AsyncStorage } from 'react-native';

import TopBar from './TopBar.js';
import BottomBar from './BottomBar.js';
import StringList from './ListStuff.js';

class Window extends Component {

    constructor(props) {
        super(props);

        this.state = { items: new Set([]), topBarSettings: { editing: false } };

        this.loadData();
    }

    loadData = async () => {
        try {
            const value = await AsyncStorage.getItem('WHITELIST');
            if (value !== null) {
                const set = new Set(JSON.parse(value));
                this.setState(previousState => {
                    previousState.items = set;
                    return previousState;
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    persistData = async (set) => {
        try {
            await AsyncStorage.setItem('WHITELIST', JSON.stringify([...set]));
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        let bottomBar;
        if (this.state.topBarSettings.editing) {
            bottomBar = <BottomBar
                window={this}
                callback={this.bottomBarCallback}
            />;
        } else {
            bottomBar = "";
        }

        const listData = [...this.state.items].map(it => {
            return { key: it };
        });

        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'stretch',
            }}>
                <TopBar
                    editEnabled={this.state.items.size > 0}
                    editing={this.state.topBarSettings.editing}
                    onEditStart={this.handleEditStart}
                    onEditCancel={this.handleEditCancel}
                    onAdd={this.handleAdd}
                />
                <StringList
                    window={this}
                    callback={this.listCallback}
                    data={listData}
                    selectable={this.state.topBarSettings.editing}
                />
                {bottomBar}
            </SafeAreaView>
        );
    }

    handleEditStart = () => {
        this.setState(previousState => {
            previousState.topBarSettings.editing = true;
            return previousState;
        });
    }

    handleEditCancel = () => {
        if (this.toBeDeleted) {
            this.toBeDeleted.clear();
        }

        this.setState(previousState => {
            previousState.topBarSettings.editing = false;
            return previousState;
        });
    }

    handleAdd = () => {
        AlertIOS.prompt(
            'Add',
            'Enter string to add it to whitelist.',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Done',
                    onPress: text => { this.handleAddInput(text) },
                },
            ],
            'plain-text',
        );
    }

    handleAddInput = (text) => {
        this.setState(previousState => {
            previousState.items.add(text);
            previousState.topBarSettings.editing = false;

            // save data
            this.persistData(previousState.items);

            return previousState;
        });
    }

    onSelectionUpdated = (selections) => {
        this.toBeDeleted = selections;

        if (selections.size > 0) {
            this.setDeleteAllowed(true);
        } else {
            this.setDeleteAllowed(false);
        }
    }

    setDeleteAllowed = (allowed) => {
        this.bottomBar.setState(previousState => {
            previousState.deleteAllowed = allowed;
            return previousState;
        });
    }

    handleDeleteClick = () => {
        this.setState(previousState => {
            this.toBeDeleted.forEach(it => {
                previousState.items.delete(it);
            });
            previousState.topBarSettings.editing = false;

            // save data
            this.persistData(previousState.items);

            return previousState;
        });
    }

    handleSelectAllClick = () => {
        this.toBeDeleted = new Set(this.state.items);
        this.list.select(this.toBeDeleted);
        this.setDeleteAllowed(true);
    }

    listCallback = (list) => {
        this.list = list;
    }

    bottomBarCallback = (bottomBar) => {
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
