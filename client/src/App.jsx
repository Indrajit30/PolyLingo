import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { setIsAuthenticated } from "./slices/authSlice";
import { useSelector } from "react-redux";
import About from "./pages/About";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import MyProfile from "./components/core/Dashboard/MyProfile";
// import Settings from "./components/core/Dashboard/Settings";
import SettingsMain from "./components/core/Dashboard/Settings/SettingsMain";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import CartMain from "./components/core/Dashboard/Cart/CartMain";
import ChatBot from "./components/core/Dashboard/ChatBot";
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourseMain from "./components/core/Dashboard/AddCourse/AddCourseMain";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Contact from "./pages/Contact";
import Test from "./components/core/Dashboard/Test/Test";


function App() {
	// const { isAuthenticated } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	return (
		<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/contact" element={<Contact />}></Route>
				<Route path="/catalog/:catalogName" element={<Catalog/>}></Route>
				<Route path="/courses/:courseId" element={<CourseDetails/>}></Route>
				<Route
					path="login"
					element={
						<OpenRoute>
							<Login />
						</OpenRoute>
					}
				></Route>
				<Route
					path="signup"
					element={
						<OpenRoute>
							<Signup />
						</OpenRoute>
					}
				></Route>
				<Route
					path="forgot-password"
					element={
						<OpenRoute>
							<ForgotPassword />
						</OpenRoute>
					}
				></Route>
				<Route
					path="update-password/:token"
					element={
						<OpenRoute>
							<UpdatePassword />
						</OpenRoute>
					}
				></Route>
				<Route
					path="/verify-email"
					element={
						<OpenRoute>
							<VerifyEmail />
						</OpenRoute>
					}
				></Route>
				{/* <Route
					path="/welcome-page"
					element={isAuthenticated ? <WelcomePage /> : <Home />}
        ></Route> */}
        
        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
				>
          <Route path="dashboard/my-profile" element={<MyProfile/> } />
					<Route path="dashboard/settings" element={<SettingsMain />} />
					
					{
						user?.accountType === ACCOUNT_TYPE.STUDENT && (
							<>
								
							<Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
							<Route path="dashboard/cart" element={<CartMain />}></Route>
							<Route path="dashboard/test" element={<Test />}></Route>
							<Route path="dashboard/chatbot" element={<ChatBot />}></Route>
							</>
						)
					}

					{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
						<>
							<Route path='dashboard/add-course' element={<AddCourseMain />}></Route>
							<Route path='dashboard/my-courses' element={<MyCourses/>}></Route>
							<Route path='dashboard/instructor' element={<Instructor/>}></Route>
							<Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}></Route>
						</>
					)}
          {/* <Route path="dashboard/cart" element={<Settings/> } /> */}
				</Route>

				<Route element={
					<PrivateRoute>
						<ViewCourse/>
					</PrivateRoute>
				}>
					{
						user?.accountType === ACCOUNT_TYPE.STUDENT && (
							<>
								<Route
									path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
									element={<VideoDetails/>}
								></Route>
							</>
						)
					}
				</Route>

				<Route path='*' element={<Error/>}></Route>
			</Routes>
		</div>
	);
}

export default App;
