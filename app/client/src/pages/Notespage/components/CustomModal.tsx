import { Box, Modal, Typography } from '@mui/material';
import { FC } from 'react';
import { formatDate } from '../../../utils/formatDate';

interface ICustomModalProps {
    title: string;
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    createdAt: string;
    text?: string;
}

const CustomModal: FC<ICustomModalProps> = ({
    title,
    text,
    open,
    handleClose,
    createdAt,
}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24,
                    padding: '0.5rem',
                    outline: 0,
                }}
            >
                <div className="text-white">
                    <Typography>
                        <span className="font-bold">Title:</span> {title}
                    </Typography>
                    {text ? <Typography>Text: {text}</Typography> : null}
                    <Typography>
                        Date of creation: {formatDate(new Date(createdAt))}
                    </Typography>
                </div>
            </Box>
        </Modal>
    );
};

export default CustomModal;
