import React, { useState } from "react";

const CourseDetails = ({ params }: { params: { courseId: string } }) => {
  return (
    <div>
      <p className="text-white-1">Course Details for {params.courseId}</p>
    </div>
  );
};

export default CourseDetails;
