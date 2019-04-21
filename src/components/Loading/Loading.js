import React from 'react';
import { connect } from 'react-redux';
import { LoadingWrapper, LoadingRing } from './Loading-style';

const Loading = props => {
  return (
    <LoadingWrapper>
      <LoadingRing>
        <div></div><div></div><div></div><div></div>
      </LoadingRing>
    </LoadingWrapper>
  )
}

export default Loading;