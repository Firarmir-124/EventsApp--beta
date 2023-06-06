import React, { useCallback, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { green } from '@mui/material/colors';
import TitleIcon from '@mui/icons-material/Title';
import SimpleMdeReact from 'react-simplemde-editor';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import 'easymde/dist/easymde.min.css';
import { createCommLink } from './CommercialLinkThunk';
import useConfirm from '../../components/Dialogs/Confirm/useConfirm';
import { openSnackbar, resetEventId, selectSelectedEventId } from '../Event/eventSlice';
import { selectCreateLinkLoading, selectUrl } from './commercialLinkSlice';
import { checkedEvent } from '../Event/eventThunk';

const ConstructorLink = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState({
    description: '',
    title: '',
  });
  const { confirm } = useConfirm();
  const listEventId = useAppSelector(selectSelectedEventId);
  const link = useAppSelector(selectUrl);
  const [open, setOpen] = useState(false);
  const loading = useAppSelector(selectCreateLinkLoading);

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
      setOpen(true);
      setValue({
        description: '',
        title: '',
      });
    } else {
      return;
    }
  };

  const handleCopy = async () => {
    try {
      if (link) {
        await dispatch(checkedEvent({ id: undefined, allChecked: true })).unwrap();
        dispatch(resetEventId());
        await navigator.clipboard.writeText(link.fullLink as string);
        dispatch(openSnackbar({ status: true, parameter: 'copy_link' }));
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
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
                      label="Имя админа"
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
                <Button disabled={loading} type="submit" variant="contained" sx={{ mt: 3 }}>
                  {!loading ? 'Создать предложение' : <CircularProgress />}
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ваша ссылка</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Paper sx={{ p: 1 }} elevation={3}>
                <Link target="_blank" href={link?.fullLink || ''} underline="none">
                  {link ? link.fullLink : 'Ссылка'}
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopy} variant="outlined">
            Скопировать
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConstructorLink;
