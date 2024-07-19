import AbcjsRenderer from "@/components/AbcjsRenderer";
import React, { useState } from "react";
import Markdown from "react-markdown";

const CourseDetails = ({ params }: { params: { courseId: string } }) => {
  const markdown = `# Hi, *${params.courseId}*!

A paragraph with *emphasis* and **strong importance**.


~~~abc
M:4/4
L:1/4
|G, B, D | G B d | g d B | G D B, | G,
~~~

~~~abc
M:4/4
L:1/4
|G, B, D | G B d | g d B | G D B, | G,
~~~

~~~abc
M:4/4
L:1/4
|G, B, D | G B d | g d B | G D B, | G,
~~~

`;
  return (
    <div>
      <Markdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <AbcjsRenderer abc={`${children}`.replace(/\n$/, "")} />
            ) : (
              <code className={className}>{children}</code>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default CourseDetails;
