import React, { ReactElement } from 'react'
import './Message.sass'
interface Props {
    isReceived?: boolean
    children: any,
    author: string,
    timestamp: string
}

function Message({isReceived = false,children,author,timestamp}: Props): ReactElement {
    const containerClass = ['Message']
    if(isReceived)
        containerClass.push('Message-Receiver')
    return (
        <div className={containerClass.join(' ')}>
        <div className="Message__Author">{author}</div>
        <div className='Message__Inner'>
            <span className="Message__Content">{children}</span>
            <span className="Message__Timestamp">{timestamp}</span>
        </div>
        </div>
    )
}

export default Message
