import React, { Component } from 'react';
import './App.css';
// import Time from './controls/time';
import ProximitySensor from './controls/proximity-sensor';
import Slider from './controls/slider-control';
import VideoFeed from './video/video-feed';
import Info from './controls/info/rpi-info';
import Settings from './settings/settings';
const uniqueString = require('unique-string');

// const Settings = () => {
//     return <div className='settings-panel'>settings here</div>;
// };

// pi 7" touchscreen Screen Resolution 800 x 480 pixels
class App extends Component {
    state = {
        videoFeeds: [
            {
                id: uniqueString(),
                ip: '192.168.55.12',
                port: '8081',
                caption: 'raw'
            }
        ],
        websocketUrl: '192.168.55.11',
        websocketPort: 5001,
        settingsShow: false
    };
    constructor() {
        super();
        const oldState = localStorage.getItem('appState');
        if (oldState) {
            let state = JSON.parse(oldState);
            state.settingsShow = false;
            console.log('has state');
            this.state = state;
        } else {
            console.log('has no state');
            const s = {
                videoFeeds: [
                    {
                        id: uniqueString(),
                        ip: '192.168.55.12',
                        port: '8081',
                        caption: 'raw'
                    }
                ],
                websocketUrl: '192.168.55.11',
                websocketPort: 5001,
                settingsShow: false
            };
            this.state = s;
        }
    }

    toggleSettingsPage = () => {
        const settings = this.state.settingsShow;
        this.setState({ settingsShow: !settings });
        console.log(!settings);
        this.saveSettings();
    };

    addVideoFeed = () => {
        const videoFeeds = [...this.state.videoFeeds];
        const feed = {
            id: uniqueString(),
            ip: '192.168.55.11',
            port: '5002',
            caption: ''
        };
        videoFeeds.push(feed);
        this.setState({ videoFeeds });
        this.saveSettings();
    };

    removeVideoFeed = id => {
        console.log(`remove feed id:${id}`);
        let videoFeeds = [...this.state.videoFeeds];
        videoFeeds = videoFeeds.filter(feed => feed.id !== id);
        this.setState({ videoFeeds });
        this.saveSettings();
    };

    editVideoFeed = (e, id, inputField) => {
        let videoFeeds = [...this.state.videoFeeds];
        // get just the matching one
        const feeds = videoFeeds.filter(feed => feed.id === id);
        // console.log(JSON.stringify(feeds));
        // get all but matching one.
        videoFeeds = videoFeeds.filter(feed => feed.id !== id);
        // console.log(JSON.stringify(videoFeeds));

        if (feeds.length > 0) {
            let feed = feeds[0];
            // const newFeed = {
            //     id: feed.id,
            //     ip: feed.ip,
            //     port: feed.port,
            //     caption: feed.caption
            // };
            switch (inputField) {
                case 'ip':
                    feed.ip = e.target.value.trim();
                    break;
                case 'port':
                    feed.port = e.target.value.trim();
                    break;
                case 'caption':
                    feed.caption = e.target.value.trim();
                    break;
                default:
                    break;
            }
            videoFeeds.push(feed);
            console.log(JSON.stringify(videoFeeds));
            this.setState({ videoFeeds });
            this.saveSettings();
        }

        // console.log(`event: ${e.target.value} id:${id} field: ${inputField}`);
    };

    saveSettings = () => {
        // console.log('TODO: save settings to local storage.');

        const state = this.state;

        localStorage.setItem('appState', JSON.stringify(state));
    };

    render() {
        const showSettings = this.state.settingsShow;
        let settings;

        if (showSettings) {
            settings = (
                <Settings
                    videoFeeds={this.state.videoFeeds}
                    toggle={this.toggleSettingsPage}
                    addFeed={this.addVideoFeed}
                    removeVideoFeed={this.removeVideoFeed}
                    editVideoFeed={this.editVideoFeed}
                />
            );
        }

        return (
            <main>
                {settings}
                <div className='App'>
                    <div className='feeds'>
                        {this.state.videoFeeds.map(feed => (
                            <VideoFeed
                                key={feed.id}
                                ip={feed.ip}
                                port={feed.port}
                                caption={feed.caption}
                            />
                        ))}
                        {/* <VideoFeed
                            url={this.state.OpencvFeedUrl}
                            port={this.state.OpencvFeedPort}
                            caption='Processed video feed'
                        />
                        <VideoFeed
                            url={this.state.rawFeedUrl}
                            port={this.state.rawFeedPort}
                            caption='Raw video feed'
                        /> */}
                        <div>
                            <button onClick={this.toggleSettingsPage}>
                                settings
                            </button>
                        </div>
                    </div>
                    <div className='controls'>
                        <ProximitySensor />
                        <Slider />
                        <Info />
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
