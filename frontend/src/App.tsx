import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import FullEvent from './Fiuters/Event/FullEvent/FullEvent';
import Event from './Fiuters/Event/Event';
import EventList from './Fiuters/Event/EventList/EventList';
import CreateEvent from './Fiuters/Event/CreateEvent/CreateEvent';
import HashtagCreate from './Fiuters/Hashtag/HashtagCreate/HashtagCreate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/full_event/:id" element={<FullEvent />} />
      <Route path="/event" element={<Event />}>
        <Route path="event_list" element={<EventList />} />
        <Route path="event_create" element={<CreateEvent />} />
        <Route path="hashtag_create" element={<HashtagCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
