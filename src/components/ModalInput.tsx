import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Fab } from '@mui/material';
import NoteType from '../types/NoteType';
import { useAppDispatch } from '../store/hooks';
import { addNote } from '../store/modules/NoteSlice';

interface ModalInputsProps {
    title: string;
    description: string;
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalInputs: React.FC<ModalInputsProps> = ({ title, description, openModal, actionCancel, actionConfirm }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const dispatch = useAppDispatch();

    const handleClose = () => {
        actionCancel();
    };

    const handleConfirm = () => {
        const newNote: NoteType = {
            id: Date.now(),
            note: noteTitle,
            description: noteDescription,
        };

        dispatch(addNote(newNote));
        actionConfirm();
        setNoteTitle('');
        setNoteDescription('');
    };
    return (
        <Box>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
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
                        value={noteTitle}
                        margin="dense"
                        id="noteTitle"
                        label="Titulo do recado"
                        type={'text'}
                        fullWidth
                        variant="standard"
                        onChange={ev => setNoteTitle(ev.target.value)}
                    />
                    <TextField
                        autoFocus
                        value={noteDescription}
                        margin="dense"
                        id="noteDescription"
                        label="Descrição do recado"
                        type={'text'}
                        fullWidth
                        variant="standard"
                        sx={{ hover: 'false' }}
                        onChange={ev => setNoteDescription(ev.target.value)}
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