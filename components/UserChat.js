import React from 'react'
import { Text, Picker, View, Platform } from 'react-native'
import { GiftedChat, Day, Time } from 'react-native-gifted-chat'
import { Header, Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer'

class UserChat extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "alege",
            data: {},
            messages: []
        }
    }
    componentWillMount() {
        this.fetchData()
    }
    fetchData() {
        fetch('https://agendainstructoruluiautoserver.herokuapp.com/getAIAChatData')
            .then((data) => data.json()
                .then((data) => {
                    this.setState({ data })
                }))
    }
    renderPickers() {
        let pickers = []
        if (Object.keys(this.state.data).length > 0)
            Object.keys(this.state.data).forEach((key, i) => {
                pickers.push(<Picker.Item key={i} label={`${key}`} value={`${key}`} />)
            })
        return pickers
    }
    onSend(messages) {
        let message = messages[0];
        fetch('https://agendainstructoruluiautoserver.herokuapp.com/sendMessage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: this.state.selectedValue,
                message: { ...message, createdAt: messages[0].createdAt.toISOString() }
            }),
        })
            .then((data) => data.json()
                .then((data) => {
                    this.setState({ data })
                    if (data[this.state.selectedValue]) { this.setState({ messages: data[this.state.selectedValue].reverse() }) }
                }))
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={<Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>Mesajele Utilizatorilor</Text>}
                    rightComponent={<Icon name='refresh' onPress={() => {
                        this.fetchData()
                    }} />}
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                />
                <Picker
                    selectedValue={this.state.selectedValue}
                    onValueChange={(selectedValue) => {
                        this.setState({ selectedValue })
                        if (selectedValue != "alege")
                            this.setState({ messages: this.state.data[selectedValue].reverse() })
                    }}
                >
                    <Picker.Item label="Alege un elev" value="alege" />
                    {this.renderPickers()}
                </Picker>
                <GiftedChat
                    placeholder="Scrie un mesaj..."
                    messages={this.state.messages}
                    onSend={messages => {
                        this.onSend(messages)
                    }}
                    renderDay={(props) => <Day {...props} textStyle={{ color: 'black' }}></Day>}
                    locale={'ro'}
                    user={{
                        _id: 'owner',
                        name: 'AIA@owner',
                        avatar: 'https://scontent.fotp3-1.fna.fbcdn.net/v/t1.0-9/48389687_527886324353679_5451882110874812416_n.png?_nc_cat=108&_nc_ht=scontent.fotp3-1.fna&oh=f4301708d36c2d64c8aab0f4d3f215cc&oe=5CCFDE9F'
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={-50} /> : null}
            </View>
        );
    }
}
export default UserChat;