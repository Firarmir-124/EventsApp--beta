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
import RecordCreate from './features/Request/User/RecordCreate';
import Profile from './features/Profile/Profile';
import RecordListUser from './features/Request/User/RecordListUser';
import Favorites from './features/Profile/Favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />}>
        <Route path="favorite" element={<Favorites />} />
        <Route path="request" element={<RecordListUser />} />
      </Route>
      <Route path="/:id" element={<Home />} />
      <Route path="/full_event/:id" element={<FullEvent />}>
        <Route path="record" element={<RecordCreate />} />
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
