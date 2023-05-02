import { Box, Container, Paper } from '@mui/material';
import React from 'react';

import Form from './Form';
import HeaderForms from './HeaderForms';

interface RegisterContProps {
    titleHeader: string;
    titleButton: string;
    mode: 'login' | 'create';
    icon: React.ReactNode;
}

const RegisterCont: React.FC<RegisterContProps> = ({ titleHeader, icon, mode, titleButton }) => {
    return (
        <Container sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
            <Paper elevation={16} sx={{height:'80%', width:'40%', display:'flex', justifyContent:'center', alignItems:'center', borderRadius: '20px'}} >
                <Box width='80%' component='section' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <HeaderForms title={titleHeader} color='#9dd07b' icon={icon} />
                    <Form textButton={titleButton} mode={mode} />
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterCont;
