import React from 'react';
import './settings.css';

export default props => {
    const handleClick = e => {
        e.stopPropagation();
    };
    // const saveValue = (e, id) => {
    //     console.log('blur');
    //     console.log(`event: ${e.target.value} id:${id}`);
    // };
    return (
        <div className='overlay' onClick={props.toggle}>
            <div className='settings-panel' onClick={handleClick}>
                <h2>Settings</h2>
                <div className='settings-panel-item'>
                    <span>Video feeds</span>
                    <span />
                    <span />
                    <button onClick={props.addFeed}>
                        <i className='fas fa-plus' />
                    </button>
                </div>
                {props.videoFeeds.map(feed => (
                    <div className='settings-panel-item' key={feed.id}>
                        <label>
                            Caption:
                            <input
                                type='text'
                                defaultValue={
                                    feed.caption
                                        ? feed.caption
                                        : 'Enter Caption'
                                }
                                onChange={e =>
                                    props.editVideoFeed(e, feed.id, 'caption')
                                }
                            />
                        </label>

                        <label>
                            URI:
                            <input
                                type='text'
                                defaultValue={feed.ip}
                                onChange={e =>
                                    props.editVideoFeed(e, feed.id, 'ip')
                                }
                                className='ip'
                            />
                        </label>
                        <label>
                            Port:
                            <input
                                type='text'
                                className='port'
                                defaultValue={feed.port}
                                onChange={e =>
                                    props.editVideoFeed(e, feed.id, 'port')
                                }
                            />
                        </label>
                        <button onClick={() => props.removeVideoFeed(feed.id)}>
                            <i className='far fa-trash-alt sm' />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
