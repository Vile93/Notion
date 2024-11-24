import { Box, Modal, Typography } from '@mui/material';
import { FC } from 'react';
import { formatDate } from '../../../utils/formatDate';

interface INoteInfo {
    title: string;
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    createdAt: string;
    text?: string;
}

const NoteInfo: FC<INoteInfo> = ({
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
                    background: 'rgba(0,0,0,0.8)',
                }}
            >
                <div className="text-white">
                    <Typography className="wrap-anywhere">
                        <span className="font-bold">Title:</span> {title}
                    </Typography>
                    {text ? (
                        <Typography className="wrap-anywhere">
                            <span className="font-bold">Text:</span> {text}
                        </Typography>
                    ) : null}
                    <Typography>
                        <span className="font-bold">Date of creation:</span>{' '}
                        {formatDate(new Date(createdAt))}
                    </Typography>
                </div>
            </Box>
        </Modal>
    );
};

export default NoteInfo;
