import io from 'socket.io-client';
import { apiURL } from './constants';

export const socket = io(apiURL);
