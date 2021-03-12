import React, { MouseEvent } from 'react';
import classNames from 'classnames';
// import * as UtilitySystem from '../UtilitySystem/helpers';
import { DetailsSummary } from './DetailsSummary';
import styles from './Details.module.scss';
import { Box, BoxProps } from '../Box/Box';

interface DetailsProps extends BoxProps {
  className?: string;
  childrenWrapperClassName?: string;
  isOpen: boolean;
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
  onTransitionCancelled: () => void;
};

export class Details extends React.Component<DetailsProps> {
  static Summary = DetailsSummary;

  state = {
    isScriptingEnabled: false,
  }

  componentDidMount() {
    this.setState({ isScriptingEnabled: true });
  }
  // const [collapseContainerHeight, setDetailsContainerHeight] = useState<number>(0);
  // const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  // const collapseChildrenWrapperRef= useRef<HTMLElement>(null);

  // useEffect(() => {
  //   setDetailsContainerHeight(isOpen ? (collapseChildrenWrapperRef?.current?.scrollHeight || 0) : 0)
  //   this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : 0 });

  //   UtilitySystem.ResizeListener.add(this.collapseChildrenWrapperRef.current, this.handleDetailsChildrenWrapperResize); // eslint-disable-line no-undef
  // }, []);

  // componentDidMount() {
  //   const { isOpen } = this.props;

  //   this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : 0 });

  //   UtilitySystem.ResizeListener.add(this.collapseChildrenWrapperRef.current, this.handleDetailsChildrenWrapperResize); // eslint-disable-line no-undef
  // }

  // componentWillUnmount() {
  //   UtilitySystem.ResizeListener.remove(this.collapseChildrenWrapperRef.current, this.handleDetailsChildrenWrapperResize); // eslint-disable-line no-undef
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { isOpen } = this.props;

  //   if (isOpen !== prevProps.isOpen) {
  //     if (prevState.isTransitioning) {
  //       this.handleTransitionCancelled();
  //     }

  //     this.setState({ isTransitioning: true }, () => { // eslint-disable-line react/no-did-update-set-state
  //       this.handleTransitionStart();
  //       this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : '0px' });
  //     });
  //   }
  // }

  // collapseChildrenWrapperRef = React.createRef();

  // // There is no synthetic event available for a transition start.
  // // We have to simulate it by triggering an event when the user changes the 'isOpen' prop.
  // handleTransitionStart = () => {
  //   this.setState({ isTransitioning: true });

  //   if (this.props.onTransitionStart) {
  //     this.props.onTransitionStart();
  //   }
  // };

  // handleTransitionEnd = (event) => {
  //   if (this.props.onTransitionEnd) {
  //     this.props.onTransitionEnd(event);
  //   }
  //   this.setState({ isTransitioning: false });
  // };

  // // Fires when a Details is toggled mid-transition, since it means the 'transitionEnd' event will never fire.
  // handleTransitionCancelled = () => {
  //   if (this.props.onTransitionCancelled) {
  //     this.props.onTransitionCancelled();
  //   }
  // }

  // handleDetailsChildrenWrapperResize = () => {
  //   const { isOpen } = this.props;
  //   this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : '0px' });
  // }

  handleToggle = (event: MouseEvent<HTMLDetailsElement>) => {
    console.log('toggled?');
    event.preventDefault();
  }

  render() {
    const {
      children,
      className,
      display = 'block',
      childrenWrapperClassName,
      isOpen,
      onTransitionStart,
      onTransitionEnd,
      onTransitionCancelled,
    } = this.props;

    const allChildren = React.Children.toArray(children);
    const summaryChildren = allChildren.filter(
      (child: React.ReactNode) =>
        // @ts-ignore
        child && child.type && child.type.toString() === DetailsSummary.toString()
    );
    const otherChildren = allChildren.filter(
      (child: React.ReactNode) =>
        // @ts-ignore
        (child && !child.type) ||
        // @ts-ignore
        (child && child.type && child.type.toString() !== DetailsSummary.toString())
    );

    // const collapseContainerClasses = cx('collapse__container', this.props.containerClassName);
    // const collapseChildrenWrapperClasses = classNames('collapse__children-wrapper', this.props.childrenWrapperClassName);

    const detailsClasses = classNames(
      className,
      styles['details-reset'],
      styles['details']
    );

    return (
      <Box
        as="details"
        // className={collapseContainerClasses}
        // onTransitionEnd={this.handleTransitionEnd}
        // style={{ height: this.state.collapseContainerHeight }}
        className={detailsClasses}
        display={display}
        open={isOpen}
        // onToggle={this.handleToggle}
      >
        {summaryChildren}
        {(!this.state.isScriptingEnabled || isOpen) && (
          <>{otherChildren}</>
        )}
      </Box>
    );
  }
}