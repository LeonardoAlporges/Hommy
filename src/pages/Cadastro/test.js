import React, { Component } from 'react';
import { ScrollView, FlatList, View, Modal, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { CheckBox, ListItem, Fab, Icon } from 'native-base';
import listStyle from './style';
import Card from '../Card/index';
import api from '../../service/api';
import _ from "lodash";


class Names extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            fullData: [],
            modalVisible: false,
            filterName: false,
            filteArge: false,
            loading: false
        };
    }

    UNSAFE_componentWillMount() {
        return api
            .get('/main')
            .then(responseJson => {
                this.setState({
                    dataList: responseJson.data,
                    fullData: responseJson.data,
                    loading: false
                });
            })
            .catch(error => {
                console.error('server off');
            });
    }

    fName = async (checked) => {
        if (this.state.filterName)
            await this.setState({ filterName: false });
        else
            await this.setState({ filterName: true });
    }
    fAge = async (checked) => {
        if (this.state.filterAge)
            await this.setState({ filterAge: false });
        else
            await this.setState({ filterAge: true });
    }

    filter = () => {
        this.setState({ dataList: this.state.fullData });
        if ((this.state.filterName) === true) {
            this.setState({ dataList: _.filter(this.state.dataList, { "Name": "Samuel" }) });
        }
        if ((this.state.filterAge) === true) {
            this.setState({ dataList: _.filter(this.state.dataList, ({ age }) => age > 20) });
        }
    };
    render() {
        return (
            <View>
                <ScrollView >
                    <FlatList
                        data={this.state.dataList}
                        renderItem={({ item }) => <Card item={item} />}
                        keyExtractor={item => item._id}
                    />
                </ScrollView>
                <View>
                    <Modal
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                    >
                        <View>
                            <Text> Name= Samuel</Text>
                            <ListItem>
                                <CheckBox onPress={this.fName} checked={this.state.filterName} />
                                <Text  >Yes</Text>
                            </ListItem>
                            <Text> age > 20</Text>
                            <ListItem >
                                <CheckBox onPress={this.fAge} checked={this.state.filterAge} />
                                <Text >Yes</Text>
                            </ListItem>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ modalVisible: false });
                                    this.filter();
                                    console.log(this.state.dataList);
                                }}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View >
                <Fab
                    direction="up"
                    containerStyle={{}}
                    position="bottomLeft"
                    onPress={() => {
                        this.setState({ modalVisible: true });
                    }}
                >
                    <Icon name="md-add" />
                </Fab>
            </View >
        );
    }
}

export default withNavigation(Name);