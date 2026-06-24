import React from 'react'
import {Routes, Route, useMatch} from "react-router-dom";
import { Home } from './pages/student/Home.tsx';
import { CourseList } from './pages/student/CourseList';
import { CourseDetail } from './pages/student/CourseDetail.tsx';
import { MyEnrollments } from './pages/student/MyEnrollments';
import { Player } from './pages/student/Player.tsx';
import { Loading } from './components/student/Loading.tsx';
import { Educator } from './pages/educator/Educator.tsx';
import { MyCourses } from './pages/educator/MyCourses.tsx';
import { AddCourse } from './pages/educator/AddCourse.tsx';
import { Dashboard } from './pages/educator/Dashboard.tsx';
import { StudentsEnrolled } from './pages/educator/StudentsEnrolled.tsx';
import { Navbar } from './components/student/Navbar.tsx';

export default function App() {

  const isEducator = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducator && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:course-id" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />

        </Route>
        
      </Routes>
    </div>
  )
}
