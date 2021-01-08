import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes, { InferProps } from 'prop-types';

type Container = React.Component | HTMLElement;

function getContainer(container?: Container | (() => Container)): HTMLElement {
  // #StrictMode ready
  return ReactDOM.findDOMNode(
    typeof container === 'function' ? container() : container
  ) as HTMLElement;
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const PortalPropTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.element,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(Element)
  ]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disabled: PropTypes.bool,
  /**
   * Callback fired once the children has been mounted into the `container`.
   *
   */
  onRendered: PropTypes.func
};

const Portal: React.FC<InferProps<typeof PortalPropTypes>> = React.forwardRef(
  (props, ref) => {
    const { children, disabled, onRendered, container = document.body } = props;

    const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

    useEnhancedEffect(() => {
      if (!disabled) {
        setMountNode(getContainer(container as Container));
      }
    }, [container, disabled]);

    useEnhancedEffect(() => {
      if (onRendered && (mountNode || disabled)) {
        onRendered();
      }
    }, [onRendered, mountNode, disabled]);

    if (disabled) {
      return children as React.ReactElement;
    }

    if (mountNode) {
      return ReactDOM.createPortal(children, mountNode);
    }

    return null;
  }
);

Portal.propTypes = PortalPropTypes;

Portal.displayName = 'Portal';

export default Portal;
export { Portal };
