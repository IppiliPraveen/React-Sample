// Login.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployService from '../services/EmployService';

interface LoginData {
    userName: string;
    password: string;
    access: string;
}

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [userid, setUserid] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRePassword] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');
    const [title, setTitle] = useState<string>('Login');

    const [loginData, setLoginData] = useState<LoginData>(
        { userName: '', password: '', access: '' }
    );
    const navigate = useNavigate();

    const handleLogin = async (btnName: string) => {

        setErrorText("");
        if (btnName === 'loginbtn') {
            setTitle('Login');
            if (userid.trim() !== '' && password.trim() !== '') {
                await navigateToDetails(userid.trim(), password.trim());
            } else {
                setErrorText('User ID and Password cannot be blank!');
            }

        } else {
            setTitle('Register');
            if (userid.trim() !== '' && password.trim() !== '') {
                await navigateToDetails(userid.trim(), password.trim());
            } else {
                setErrorText('User ID and Password cannot be blank!');
            }
        }

    };

    const navigateToDetails = async (userid: string, password: string) => {
        setLoginData({ userName: userid, password, access: '' });
        if (title === 'Login') {
            const isLoggedIn = await fetchLogin(loginData);
            if (isLogin) {
                navigate('/employDetails');
            } else {
                setErrorText("Incorrect UserID/Password!");
            }
        } else {
            const isLoggedIn = await fetchLogin(loginData);
            if (isLogin) {
                setTitle('Login');
                setPassword('');
                setUserid('');
                navigate('/');
            } else {
                setErrorText("User Already Exist!");
            }
        }
    };

    const fetchLogin = async (loginData: LoginData) => {
        try {
            let response: any;
            if (title === 'Register' && repassword!=='') {
                console.log("rig logic ");
                response = await EmployService.register(loginData);
            } else {
                console.log("log logic ");
                response = await EmployService.getLogin(loginData);
            }

            setIsLogin(response.data);
            return isLogin;
        } catch (error) {
            console.error(error);
            return isLogin;
        }
    };

    function checkPassword(value: string): void {
        setRePassword(value);
        if (value === password) {
            setErrorText("");
        } else {
            setErrorText("password and conform password should match");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>{title}</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                style={{ margin: '10px', padding: '10px', width: '200px' }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: '10px', padding: '10px', width: '200px' }}
            />
            <input
                type="password"
                placeholder="Re-type Password"
                value={repassword}
                onChange={(e) => checkPassword(e.target.value)}
                style={{ margin: '10px', padding: '10px', width: '200px' }}
                hidden={title === 'Login'} />
            <div>
                <p className='errorMsg'>{errorText}</p>
            </div>
            <table>
                <tr aria-colspan={2}>
                    <td>
                        <button onClick={() => handleLogin('loginbtn')}
                            style={{ padding: '10px 20px', marginTop: '20px' }}>Login</button>
                    </td>
                    <td>
                        <button onClick={() => handleLogin('registerbtn')}
                            style={{ padding: '10px 20px', marginTop: '20px' }}
                            disabled={repassword !== password && title==='Register'}>Register</button>
                    </td>
                </tr>
            </table>


        </div>
    );
};

export default Login;