import { FC, useRef, useState } from 'react';
import Router from 'next/router';

import axios from 'axios';

import { Dialog, Box, Typography, CardMedia, Button, Skeleton, Paper } from '@mui/material';

import useAuthentication from '../../../hooks/useAuthentication';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AccountsDialog: FC<Props> = ({ open, onClose }) => {
  const { User, CloseSession } = useAuthentication();

  const handleCloseSession = () => {
    CloseSession();
    Router.push('/signin');
  };

  return (
    <Dialog open={open} PaperProps={{ sx: { minWidth: '90vw', p: 2 } }}>
      <Box>
        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1} color="#555">
          <Typography variant="body1" fontSize="20px">
            <strong>
              {User.name} {User.surname}
            </strong>
          </Typography>
          <Typography variant="body1" fontSize="13px" mt="3px">
            #184263
          </Typography>
        </Box>
        <Typography variant="body1" fontSize="11px">
          {User.email}
        </Typography>
      </Box>
      <Typography variant="h5" fontSize="15px" fontWeight="bold" color="#555" mt={2}>
        ID Images
      </Typography>
      <Typography variant="body1" fontSize="11px" color="#888" ml="5px">
        The uploaded images are used to verify your identity, please consider to upload at least one
        image.
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start">
        <ImageCard
          image="https://upload.wikimedia.org/wikipedia/commons/f/fe/C%C3%A9dula_de_Identidad_electr%C3%B3nica_de_Uruguay_-_Frente.jpg"
          title="Document front"
          updatedAt="29/08/2022 13:06"
        />
        <ImageCard
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dorso_de_la_C%C3%A9dula_de_Identidad_electr%C3%B3nica_de_Uruguay.jpg/220px-Dorso_de_la_C%C3%A9dula_de_Identidad_electr%C3%B3nica_de_Uruguay.jpg"
          title="Document back"
          updatedAt="29/08/2022 13:08"
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="flex-end" mt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
          <Button variant="text" color="error" onClick={handleCloseSession} fullWidth>
            Close Session
          </Button>
          <Button variant="text" color="primary" fullWidth onClick={onClose}>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

/* Image Card */
type ImageCardProps = {
  title: string;
  updatedAt: string;
  image: string;
};

const ImageCard: FC<ImageCardProps> = ({ title, updatedAt, image }) => {
  const API_KEY = '03e799e84c44451a5e217bd19810d4ec';
  const BASE_URL = 'https://api.imgbb.com/1';
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState(image);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    const req = await axios({
      method: 'POST',
      url: `${BASE_URL}/upload?key=${API_KEY}`,
      data: {
        image: imgRef.current?.files?.[0],
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setImgSrc(req.data.data.url);
    setIsLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ my: '5px', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <Box display="flex" flexDirection="column" color="#666">
          <Typography variant="body1" fontSize="12px" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body1" fontSize="12px">
            {updatedAt}
          </Typography>
          <Button variant="text" color="primary" fullWidth>
            <label htmlFor={title.replace(' ', '-').toLowerCase()} style={{ cursor: 'pointer' }}>
              Upload
            </label>
            <input
              ref={imgRef}
              onChange={handleUpload}
              type="file"
              id={title.replace(' ', '-').toLowerCase()}
              accept="image/*"
              hidden
            />
          </Button>
        </Box>
        {isLoading ? (
          <Skeleton variant="rectangular" width={90} height={70} sx={{ borderRadius: '8px' }} />
        ) : (
          <CardMedia
            component="img"
            image={imgSrc}
            alt={title}
            sx={{ width: 90, maxHeight: 70, borderRadius: '8px' }}
          />
        )}
      </Box>
    </Paper>
  );
};
