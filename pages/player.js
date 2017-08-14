
import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Slider,
} from 'react-native';

import Video from 'react-native-video';

export default class extends Component {
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
            <Video source={{uri: "http://192.168.1.234:2000/out/playlist.m3u8"}}   // Can be a URL or a local file.
                   ref={(ref) => {
                       this.player = ref
                   }}                                      // Store reference
                   rate={1.0}                              // 0 is paused, 1 is normal.
                   volume={1.0}                            // 0 is muted, 1 is normal.
                   muted={false}                           // Mutes the audio entirely.
                   paused={this.state.paused}                          // Pauses playback entirely.
                   resizeMode={this.state.resizeMode}      // Fill the whole screen at aspect ratio.*
                   repeat={true}                           // Repeat forever.
                   playInBackground={false}                // Audio continues to play when app entering background.
                   playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                   progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                   onLoadStart={this.loadStart}            // Callback when video starts to load
                   onLoad={this.onLoad}               // Callback when video loads
                   onProgress={this.onProgress}               // Callback every ~250ms with currentTime
                   onEnd={this.onEnd}                      // Callback when playback finishes
                   onError={this.videoError}               // Callback when video cannot be loaded
                   onBuffer={this.onBuffer}                // Callback when remote video is buffering
                   onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                   style={styles.video} />
            <Slider style={styles.slider} maximumValue={this.state.time} minimumValue={0} onSlidingComplete={this.onChange} value={this.state.currentTime} />
        </View>
    }

}

const styles = StyleSheet.create({
    video:{left:0,right:0,top:0,bottom:0,position:"absolute"},
    slider:{left:0,right:0,bottom:0,position:"absolute"}

});
