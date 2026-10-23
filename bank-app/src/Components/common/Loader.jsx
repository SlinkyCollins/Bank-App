import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #4a90e2;
`;

const Loader = ({ loading }) => {
  return (
    <div className="loader">
        <ClipLoader cssOverride={override} size={150} color={"#4a90e2"} loading={loading} />
    </div>
  )
}

export default Loader