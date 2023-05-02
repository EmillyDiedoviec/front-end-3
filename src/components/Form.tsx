import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userType from '../types/UserType';
import { useAppSelector } from '../store/hooks';
import { useAppDispatch } from '../store/hooks';
import { useDispatch } from 'react-redux';
import { selectAllUsers } from '../store/modules/UserSlice';
import { setuserLogged } from '../store/modules/UserLoggedSlice';
import salvarLocalStorage from '../store/modules/UserSlice';

interface FormProps {
    textButton: string;
    mode: 'login' | 'create'
}

const Form: React.FC<FormProps> = ({ textButton, mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepassword, setErrorRepassword] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const users = useAppSelector(selectAllUsers);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'create') {
            const emailValid = (email.includes('.com') || email.includes('.com.br') && email.includes('@'));

            if(email.length > 0){
                setErrorEmail(!emailValid);
            }

            const passwordValid = password.length >= 6; 
            if(password.length > 0){
                setErrorPassword(!passwordValid);
            }

            const repasswordValid = password === repassword;
            if(repassword.length > 0) {
                setErrorPassword(!repasswordValid);
            }

            setDisabled(!(emailValid && passwordValid && repasswordValid));
        }
    }, [email, password, repassword, mode]);

    function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (mode === 'login') {
            const user: userType = {
                email,
                password,
                notes: []
            };

            const userExist = users.find((value) => value.email === user.email);

            if(!userExist){
                alert('usuario ou senha incorretos');
                return;
            }

            dispatch(setuserLogged({email: userExist.email, password: userExist.password, notes: userExist.notes}));
            navigate('/notes');
        }
    }

    return (
        <Box component='form' marginTop={2} width='100%' height='100%'>

            <TextField
                margin="normal"
                type="email"
                id="email"
                label="Email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                }}
                required
                fullWidth
                sx={{my: '5px'}}
            />

            <TextField 
                margin="normal"
                type="password"
                id="password"
                label="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
                sx={{my: '5px'}}
            />

            {mode === 'create' && (
                <TextField 
                    margin="normal"
                    type="password"
                    id="repassword"
                    label="Repetir a senha"
                    onChange={e => setRepassword(e.target.value)}
                    helperText={errorRepassword ? 'As senhas não são iguais' : ''}
                    required
                    fullWidth
                    sx={{my: '5px'}}
                />
            )}

            <Grid container justifyContent="center">
                <Grid item xs={12} textAlign='center'>
                    <Button 
                        type='submit' 
                        variant='contained' 
                        sx={{
                            my: 3,
                            padding: '10px',
                            borderRadius: '8px',
                            width: '70%',
                            backgroundColor: '#9dd07b',
                            color: 'black',
                            fontSize: '20px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#92cb6c',
                                boxShadow: 'none',
                            }
                        }}>
                        {textButton}
                    </Button>
                </Grid>


                <Grid item xs={12} textAlign="end">
                    {mode === 'login' ? (
                        <Typography textAlign="center" variant="body1">
                            <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
                                Não tem uma conta? Cadastre-se!
                            </Link>
                        </Typography>
                    ) : (
                        <Typography textAlign="center" variant="body1">
                            <Link style={{ color: 'black', textDecoration: 'none' }} to="/login">
                                Já tem uma conta? Entre agora mesmo!
                            </Link>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Form;
