import React from "react";

const CourseDetails = ({ params }: { params: { courseId: string } }) => {
  return <p className="text-white-1">Course Details for {params.courseId}</p>;
};

export default CourseDetails;
