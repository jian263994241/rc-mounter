# rc-mounter

Use `ReactDOM.createPortal` as a component.

```jsx
import { Portal } from 'rc-mounter';

<Portal>
// code....
</Portal>

```

### Props

- container
- children
- disablePortal
- onRendered


```js
Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(Element),
  ]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Callback fired once the children has been mounted into the `container`.
   *
   */
  onRendered: PropTypes.func,
};
```
