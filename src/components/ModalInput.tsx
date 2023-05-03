import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/modules/UserSlice';
import { addNewTask } from '../store/modules/UserLoggedSlice';
import NoteType from '../types/NoteType';


interface ModalInputsProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}


const ModalInputs: React.FC<ModalInputsProps> = ({ openModal, actionCancel, actionConfirm }) => {
    const dispatch = useAppDispatch();
    const[note, setNote] = React.useState({} as NoteType);
    const userLogged = useAppSelector(state => state.userLogged.userLogged);

    useEffect(() =>{
        dispatch(updateUser({id: userLogged.email, changes: userLogged}));
    },[userLogged]);
    
    const handleClose = () => {
        actionCancel();
    };
  
    const handleChange = (ev: { target: { name: string; value: string } }) => {
        setNote(state => ({ ...state, [ev.target.name]: ev.target.value }));
    };
  
    const handleConfirm = () =>{
        dispatch(
            addNewTask({
                ...note,
                id: Date.now(),
                favorite: false
            })
        );
        actionConfirm();
    };
  
    return (
        <Box>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>Recados</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{
                            '& label.Mui-focused': {
                                color: '#222',
                            },
                            ' & .MuiInputBase-input': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#222',
                                },
                            },
                        }}
                        autoFocus
                        value={note.note}
                        margin="dense"
                        id="noteTitle"
                        label="Titulo do recado"
                        type={'text'}
                        fullWidth
                        name='note'
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        value={note.description}
                        margin="dense"
                        id="noteDescription"
                        label="Descrição do recado"
                        type={'text'}
                        fullWidth
                        name='description'
                        variant="standard"
                        sx={{ hover: 'false' }}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#222' }}>
                            Cancelar
                    </Button>
                    <Button onClick={handleConfirm} sx={{ color: '#222' }}>
                            Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModalInputs;