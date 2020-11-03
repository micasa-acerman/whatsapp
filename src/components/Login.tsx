import { Button } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { auth, provider } from '../common'
import { useStateValue } from '../redux/StateProvider'
import { actionTypes } from '../redux/reducer'
import './Login.sass'
interface Props {
    
}

export default function Login({}: Props): ReactElement {
    const [,dispatch] = useStateValue()
    
    const signIn = ()=>{
        auth.signInWithPopup(provider)
            .then(result=>{
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
    }
    
    return (
        <div className="Login">
            <div className="Login__Container">
                <img className='Login__Logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png' alt='' />
                <div className="Login__Text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button className="Login__Action" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>            
        </div>
    )
}
