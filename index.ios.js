
import React, {
    Component
} from 'react';

import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Slider,
} from 'react-native';

import Video from 'react-native-video';

class nas extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        time: 0.0,
        currentTime: 0.0,
        paused: false,
    };
    componentWillMount(){
        var createClient = require("./webdav");
        createClient.setFetchMethod(fetch);

        var client = createClient(
            "http://192.168.1.234:2000"
        );

        client
            .getDirectoryContents("/")
            .then(function(contents) {
                console.log(JSON.stringify(contents, undefined, 4));
            });
    }

    onLoad=(data)=> {
        this.setState({time: data.duration});
    }

    onProgress=(data)=> {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer=(isLoading)=> {
        this.setState({ isLoading });
    }
    onChange=(seek)=>{
        this.player.seek(seek)
    }
    render(){
        return <View style={{width:"100%",height:"100%"}}>
        </View>
    }

}

const styles = StyleSheet.create({

});


AppRegistry.registerComponent('nas', () => nas);
