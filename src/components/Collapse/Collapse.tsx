import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import * as UtilitySystem from '../UtilitySystem/helpers';

interface CollapseProps {
  children: React.ReactNode;
  className?: string;
  childrenWrapperClassName?: string;
  isOpen: boolean;
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
  onTransitionCancelled: () => void;
};

export const Collapse: React.FC<CollapseProps> = ({
  children,
  className,
  childrenWrapperClassName,
  isOpen,
  onTransitionStart,
  onTransitionEnd,
  onTransitionCancelled,
}) => {
  const [collapseContainerHeight, setCollapseContainerHeight] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const collapseChildrenWrapperRef= useRef<HTMLElement>(null);

  useEffect(() => {
    setCollapseContainerHeight(isOpen ? (collapseChildrenWrapperRef?.current?.scrollHeight || 0) : 0)
    this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : 0 });

    UtilitySystem.ResizeListener.add(this.collapseChildrenWrapperRef.current, this.handleCollapseChildrenWrapperResize); // eslint-disable-line no-undef
  }, []);

  componentDidMount() {
    const { isOpen } = this.props;

    this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : 0 });

    UtilitySystem.ResizeListener.add(this.collapseChildrenWrapperRef.current, this.handleCollapseChildrenWrapperResize); // eslint-disable-line no-undef
  }

  componentWillUnmount() {
    UtilitySystem.ResizeListener.remove(this.collapseChildrenWrapperRef.current, this.handleCollapseChildrenWrapperResize); // eslint-disable-line no-undef
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.props;

    if (isOpen !== prevProps.isOpen) {
      if (prevState.isTransitioning) {
        this.handleTransitionCancelled();
      }

      this.setState({ isTransitioning: true }, () => { // eslint-disable-line react/no-did-update-set-state
        this.handleTransitionStart();
        this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : '0px' });
      });
    }
  }

  collapseChildrenWrapperRef = React.createRef();

  // There is no synthetic event available for a transition start.
  // We have to simulate it by triggering an event when the user changes the 'isOpen' prop.
  handleTransitionStart = () => {
    this.setState({ isTransitioning: true });

    if (this.props.onTransitionStart) {
      this.props.onTransitionStart();
    }
  };

  handleTransitionEnd = (event) => {
    if (this.props.onTransitionEnd) {
      this.props.onTransitionEnd(event);
    }
    this.setState({ isTransitioning: false });
  };

  // Fires when a Collapse is toggled mid-transition, since it means the 'transitionEnd' event will never fire.
  handleTransitionCancelled = () => {
    if (this.props.onTransitionCancelled) {
      this.props.onTransitionCancelled();
    }
  }

  handleCollapseChildrenWrapperResize = () => {
    const { isOpen } = this.props;
    this.setState({ collapseContainerHeight: isOpen ? this.collapseChildrenWrapperRef.current.scrollHeight : '0px' });
  }

  render() {
    const { children } = this.props;

    const collapseContainerClasses = cx('collapse__container', this.props.containerClassName);
    const collapseChildrenWrapperClasses = cx('collapse__children-wrapper', this.props.childrenWrapperClassName);

    return (
      <div
        className={collapseContainerClasses}
        onTransitionEnd={this.handleTransitionEnd}
        style={{ height: this.state.collapseContainerHeight }}
      >
        <div className={collapseChildrenWrapperClasses} ref={this.collapseChildrenWrapperRef}>
          {children}
        </div>
      </div>
    );
  }
}