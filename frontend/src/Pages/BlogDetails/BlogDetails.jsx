import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsBreadcrumbs from '../../Components/DetailsBreadcrumbs/DetailsBreadcrumbs';
import TrueGoalEducation from '../../Components/TrueGoalEducation/TrueGoalEducation';

const BlogDetails = () => {
  const { id } = useParams(); // Grab the dynamic ID from the URL

  return (
    <div>
      <DetailsBreadcrumbs />
      <TrueGoalEducation postId={id} /> {/* Pass ID down to content loader */}
    </div>
  );
};

export default BlogDetails;