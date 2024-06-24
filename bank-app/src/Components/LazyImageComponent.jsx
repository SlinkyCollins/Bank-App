import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyImageComponent = () => (
  <div>
    <LazyLoadImage
      alt="Example image"
      height="200px"
      effect="blur"
      src="/src/assets/banking1.jpg" // Replace with your image source
      width="300px"
    />
  </div>
);

export default LazyImageComponent;
