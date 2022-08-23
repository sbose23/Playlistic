// @ts-nocheck 
import {useAuth0} from '@auth0/auth0-react';
import './styles/UserAuth.css'

// <li>
//    
 // </li>
 //        <li>
 // <button onClick={loginWithRedirect}>Login</button>
 // </li>
 //        <li>
 // <button onClick={logout}>Logout</button>
 // </li>
 
function UserAuth(){

    const {loginWithRedirect, logout, isAuthenticated} = useAuth0()

    return (
        <div class="auth">
            {isAuthenticated ? <button class="logout" onClick={logout}>Logout</button> :
                               <button class="login" onClick={loginWithRedirect}>Login or Sign-up </button>}
            {isAuthenticated ? null : <p class="small">(Redirects to Auth0)</p>}
        </div>
    )
}

export default UserAuth;