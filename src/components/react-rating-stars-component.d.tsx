declare module 'react-rating-stars-component' {
    import { Component } from 'react';
  
    interface ReactStarsProps {
      count?: number;
      value?: number;
      onChange?: (newValue: number) => void;
      size?: number;
      isHalf?: boolean;
      emptyIcon?: JSX.Element;
      halfIcon?: JSX.Element;
      filledIcon?: JSX.Element;
      color?: string;
      activeColor?: string;
    }
  
    class ReactStars extends Component<ReactStarsProps> {}
  
    export default ReactStars;
  }
  