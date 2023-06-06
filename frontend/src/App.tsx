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
import RequestList from './features/Request/Admin/RequestList';
import AlertUser from './features/Profile/AlertUser/AlertUser';
import Protected from './components/Protected';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/User/usersSlice';
import ConstructorLink from './features/CommercialLink/ConstructorLink';
import CommercialLink from './features/CommercialLink/CommercialLink';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Protected userRole={user?.role} priority="user" />}>
        <Route path="/profile" element={<Profile />}>
          <Route path="favorite" element={<Favorites />} />
          <Route path="request" element={<RecordListUser />} />
          <Route path="alert" element={<AlertUser />} />
        </Route>
      </Route>
      <Route path="/:id" element={<Home />} />
      <Route path="/full_event/:id" element={<FullEvent />}>
        <Route element={<Protected userRole={user?.role} priority="user" />}>
          <Route path="record" element={<RecordCreate />} />
        </Route>
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Protected userRole={user?.role} priority="organizer" />}>
        <Route path="/event" element={<Event />}>
          <Route path="event_list" element={<EventList />} />
          <Route path="event_create" element={<CreateEvent />} />
          <Route path="hashtag_create" element={<HashtagCreate />} />
          <Route path="list_request" element={<RequestList />} />
          <Route path="constructor_link" element={<ConstructorLink />} />
        </Route>
      </Route>
      <Route element={<Protected userRole={user?.role} priority="organizer" />}>
        <Route path="/link/:id" element={<CommercialLink />} />
      </Route>
    </Routes>
  );
}

export default App;
