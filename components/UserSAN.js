import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { Item, Label, Input } from 'native-base';
import { Header, Button } from 'react-native-elements';

class UserSAN extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            password: ''
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>Trimite un mesaj TOU</Text>}
                />
                <Item stackedLabel>
                    <Label style={{ color: 'black', fontSize: 20 }}>Titlu:</Label>
                    <Input style={{ color: 'black', fontSize: 18 }} onChangeText={(title) => { this.setState({ title }) }} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ color: 'black', fontSize: 20 }}>Body:</Label>
                    <Input style={{ color: 'black', fontSize: 18 }} onChangeText={(body) => { this.setState({ body }) }} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ color: 'black', fontSize: 20 }}>Parola:</Label>
                    <Input style={{ color: 'black', fontSize: 18 }} onChangeText={(password) => { this.setState({ password }) }} />
                </Item>
                <Button
                    onPress={() => {
                        fetch('https://agendainstructoruluiautoserver.herokuapp.com/sendToAll', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                message: {
                                    title: this.state.title,
                                    body: this.state.body,
                                },
                                password: this.state.password
                            }),
                        })
                    }}
                    backgroundColor='#1E6EC7'
                />
            </View>
        );
    }
}
export default UserSAN;