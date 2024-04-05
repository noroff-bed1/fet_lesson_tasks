import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ name, bio, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="user-profile"
      style={{ padding: '10px', border: '1px solid #ddd' }}
    >
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
};

UserProfile.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  isLoading: PropTypes.bool,
};

UserProfile.defaultProps = {
  name: 'Ola Nordmann',
  bio: 'Just a simple Norwegian developer.',
  isLoading: false,
};

export default UserProfile;
