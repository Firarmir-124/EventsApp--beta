import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './features/Home/Home';
import FullEvent from './features/Event/user/FullEvent';
import Event from './features/Event/Event';
import EventList from './features/Event/admin/EventList';
import CreateEvent from './features/Event/admin/CreateEvent';
import HashtagCreate from './features/Hashtag/admin/HashtagCreate';
import Register from './features/User/Register/Register';
import Login from './features/User/Login/Login';
import Record from './features/Record/Record';
import Profile from './features/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/full_event/:id" element={<FullEvent />}>
        <Route path="record" element={<Record />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/event" element={<Event />}>
        <Route path="event_list" element={<EventList />} />
        <Route path="event_create" element={<CreateEvent />} />
        <Route path="hashtag_create" element={<HashtagCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
