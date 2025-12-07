import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PropertyListing from "./Components/PropertyListing/PropertyListing";
import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import Accomodation from "./Components/Accomodation/Accomodation";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import MyBookings from "./Components/Mybookings/MyBookings";
import BookingDetails from "./Components/Mybookings/BookingDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="*" element={<Main />} id="main" exact>
        <Route id="home" index element={<PropertyList />} />
        <Route
          element={<PropertyListing />}
          id="propertyListing"
          path="propertylist"
          exact
        />
        {/* Login */}
        <Route id="login" path="login" element={<Login />} />
        <Route id="signup" path="signup" element={<Signup />} />
        <Route id="profile" path="profile" element={<Profile />} />
        <Route id="editprofile" path="editprofile" element={<EditProfile />} />
        {/* accomendation */}
        <Route
          id="accomodation"
          path="accomodation"
          element={<Accomodation />}
        />
        <Route
          id="mybookings"
          path="user/mybookings"
          element={<MyBookings />}
        />
        <Route
          id="bookingdetails"
          path="user/mybookings/bookingdetails"
          element={<BookingDetails />}
        />
      </Route>
    )
  );
  return (
    <div className="App">
      {/* <Home /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
