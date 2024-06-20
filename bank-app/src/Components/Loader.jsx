import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Loader = ({ loading }) => {
  return (
    <div className="loader">
        <ClipLoader cssOverride={override} size={150} color={"#123abc"} loading={loading} />
    </div>
  )
}

export default Loader