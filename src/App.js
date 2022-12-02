import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Host from './pages/host/Host';
import HostHome from './pages/HostHome/HostHome';
import HostAuthenticate from './pages/HostAuthenticate/HostAuthenticate';
import HostActivate from './pages/HostActivate/HostActivate';
import HostRooms from './pages/HostRooms/HostRooms';
import HostRoom from './pages/HostRoom/HostRoom'
import Admin from './pages/admin/Admin'
import AdminAuthenticate from './pages/AdminAuthenticate/AdminAuthenticate'
import AdminHome from './pages/AdminHome/AdminHome'
import AdminRoom from './pages/AdminRoom/AdminRoom'
import AdminRooms from './pages/AdminRooms/AdminRooms'
import AdminActivate from './pages/AdminActivate/AdminActivate'
// import Schedulemeeting from './pages/Schedule meeting/Schedulemeeting'
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import CreateHost from './pages/CreateHost/CreateHost';
// import Edit from './pages/Edit/Edit';
// import  App from './pages/Calender/Calenderok'
import Calenderok from './pages/Calender/Calenderok';
import EditStepName from './pages/EditSteps/EditStepName/EditStepName';
// import Message from './pages/Message/Message';
function App() {
    // call refresh endpoint
    const { loading } = useLoadingWithRefresh();

    return loading ? (
        <Loader message="Loading, please wait.." />
    ) : (
        <BrowserRouter>
            <Navigation />
            <Switch>
           
                {/* <GuestRoute path="/message" exact>
                    <Message />
                </GuestRoute> */}
               
                <GuestRoute path="/" exact>
                    <Home />
                </GuestRoute>

                <GuestRoute path="/authenticate">
                    <Authenticate />
                </GuestRoute>
                <SemiProtectedRoute path="/activate">
                    <Activate />
                </SemiProtectedRoute>
                <ProtectedRoute path="/rooms">
                    <Rooms />
                </ProtectedRoute>
                <ProtectedRoute path="/room/:id">
                    <Room />
                </ProtectedRoute>
                <GuestRoute1 path="/host" exact>
                    <Host />
                </GuestRoute1>
                <GuestRoute1 path="/hostname" exact>
                    <HostHome />
                </GuestRoute1>
                <GuestRoute1 path="/hostauthenticate">
                    <HostAuthenticate />
                </GuestRoute1>
                <SemiProtectedRoute1 path="/hostactivate">
                    <HostActivate />
                </SemiProtectedRoute1>
                <ProtectedRoute1 path="/hostrooms">
                    <HostRooms />
                </ProtectedRoute1>
                <ProtectedRoute1 path="/meetings">
                    <Calenderok />
                </ProtectedRoute1>
                <ProtectedRoute1 path="/hostroom/:id">
                    <HostRoom />
                </ProtectedRoute1>
                
                <GuestRoute2 path="/Admin" exact>
                    <Admin />
                </GuestRoute2>
                <GuestRoute2 path="/Adminname" exact>
                    <AdminHome />
                </GuestRoute2>
                <GuestRoute2 path="/Adminauthenticate">
                    <AdminAuthenticate />
                </GuestRoute2>
                <SemiProtectedRoute2 path="/Adminactivate">
                    <AdminActivate />
                </SemiProtectedRoute2>
                <ProtectedRoute2 path="/Adminrooms">
                    <AdminRooms />
                </ProtectedRoute2>
                <ProtectedRoute2 path="/Adminroom/:id">
                    <AdminRoom />
                </ProtectedRoute2>
                <ProtectedRoute2 path="/Dashboard">
                    <Dashboard />
                </ProtectedRoute2>
                <ProtectedRoute2 path="/Users">
                    <Users />
                </ProtectedRoute2>
                <ProtectedRoute2 path="/createhost">
                    <CreateHost />
                </ProtectedRoute2>
                <ProtectedRoute2 path="/editprofile/:id">
                    <EditStepName />
                </ProtectedRoute2>
                
             
            </Switch>
        </BrowserRouter>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/rooms',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};
const GuestRoute2 = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/Adminrooms',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};
const GuestRoute1 = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/hostrooms',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user?.activated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/rooms',
                            state: { from: location },
                        }}
                    />
                );
            }}
        ></Route>
    );
};
const SemiProtectedRoute2 = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user?.activated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/Adminrooms',
                            state: { from: location },
                        }}
                    />
                );
            }}
        ></Route>
    );
};
const SemiProtectedRoute1 = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user?.activated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/hostrooms',
                            state: { from: location },
                        }}
                    />
                );
            }}
        ></Route>
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user?.activated ? (
                    <Redirect
                        to={{
                            pathname: '/activate',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};
const ProtectedRoute2 = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user?.activated ? (
                    <Redirect
                        to={{
                            pathname: '/Adminactivate',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};
const ProtectedRoute1 = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user?.activated ? (
                    <Redirect
                        to={{
                            pathname: '/hostactivate',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};


export default App;