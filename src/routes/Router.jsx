import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignUpPage from "../pages/Signup/SignUpPage";
import SignInPage from "../pages/Signin/SignInPage";
import CourseSearchPage from "../pages/Course/CourseSearchPage";
import CoursePlansPage from "../pages/Plans/CoursePlansPage";
import CourseBuyingPage from "../pages/Plans/CourseBuyingPage";
import Course from "../pages/Course/Course";
import CourseDetail from "../pages/Course/CourseDetail";
import AddToCartPage from "../pages/Cart/AddToCartPage";
import BlogPage from "../pages/Blog/BlogPage";
import HelpCenter from "../pages/Help Center/HelpCenter";
import BlogDetailPage from "../pages/Blog/BlogDetailPage";
const router = createBrowserRouter(
    [
        {
            path : "/",
            element : <MainLayout/>,
            children : [ 
                {
                path : "/",
                element : <Home/>
            },
            {
                path : "/signup",
                element : <SignUpPage/>
            },
            {
                path : "/signin",
                element : <SignInPage/>
            },
            {
                path : "/explore/programming/python",
                element : <CourseSearchPage/>
            },
            {
                path : "/explore/programming/JavaScript",
                element : <Course/>
            },
            {
                path : "/coursedetailpage/:id",
                element : <CourseDetail/>
            },
            {
                path : "/plans/basic",
                element : <CoursePlansPage/>
            },
            {
                path : "/plans/basic/course",
                element : <CourseBuyingPage/>
            },
            {
                path : "/cart",
                element : <AddToCartPage/>
            },
            {
                path : "/resources/blog",
                element : <BlogPage/>
            },
            {
                path : "/resources/blog/blogdetailpage",
                element : <BlogDetailPage/>
            },
            {
                path : "/resources/help-center",
                element : <HelpCenter/>
            },

            
            
            
            
            
            
            ]
        },
    ]
);

export default router;