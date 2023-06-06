import React, { useCallback, useMemo, useState } from 'react';
import { Avatar, Box, Chip, Container, Grid, TextField, Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { green } from '@mui/material/colors';
import TitleIcon from '@mui/icons-material/Title';
import SimpleMdeReact from 'react-simplemde-editor';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import 'easymde/dist/easymde.min.css';
import { createCommLink } from './CommercialLinkThunk';
import useConfirm from '../../components/Dialogs/Confirm/useConfirm';
import { selectSelectedEventId } from '../Event/eventSlice';

const ConstructorLink = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState({
    description: '',
    title: '',
  });
  const { confirm } = useConfirm();
  const listEventId = useAppSelector(selectSelectedEventId);

  const options = useMemo(() => {
    return {
      spellChecker: false,
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autoSave: {
        enabled: true,
        delay: 1000,
      },
    };
  }, []);

  const onChangeDescription = useCallback((value: string) => {
    setValue((prev) => ({ ...prev, description: value }));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const createCommercialLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await confirm('Уведомление', 'Подвердите создание коммерческого предложения')) {
      const obj = {
        title: value.title,
        event: listEventId,
        description: value.description ? value.description : null,
      };
      await dispatch(createCommLink(obj)).unwrap();
      setValue({
        description: '',
        title: '',
      });
    } else {
      return;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Box
        sx={{
          mt: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <ConstructionIcon color="success" />
        </Avatar>
        <Grid spacing={2} container>
          <Grid xs={12} item>
            <Chip
              sx={{ fontSize: '20px', p: 3, marginRight: 'auto', mt: 2 }}
              label={'Ввести данные '}
              variant="outlined"
              color="info"
            />
            <Box component="form" sx={{ mt: 3, width: '100%' }} onSubmit={createCommercialLink}>
              <Grid container sx={{ flexDirection: 'column' }} spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
                      <TitleIcon />
                    </Avatar>
                    <TextField
                      label="Название организации"
                      name="title"
                      type="text"
                      autoComplete="current-password"
                      fullWidth
                      variant="outlined"
                      required
                      onChange={onChange}
                      value={value.title}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} display="flex">
                  <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
                    <ChatBubbleOutlineIcon />
                  </Avatar>
                  <SimpleMdeReact
                    options={options}
                    style={{ width: '100%' }}
                    value={value.description}
                    onChange={onChangeDescription}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Создать предложение
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConstructorLink;
