import React from 'react';
import styles from './index.scss';
import downArrow from 'assets/images/down_arrow.png';
import { handleClickOutside } from 'utils/handleClickOutside';
import PropTypes from 'prop-types';

const Dropdown = props => {
  const [open, setOpen] = React.useState(false);
  const [selected, changeSelected] = React.useState(props.items[0]);
  const ref = React.useRef(null);

  const handleItemClick = React.useCallback(
    e => {
      changeSelected(e.target.dataset.type);
      props.handleChange(e.target.dataset.type);
      setOpen(false);
    },
    [props]
  );
  const handleDropdownClick = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  React.useEffect(() => {
    const closeDropdown = () => {
      setOpen(false);
    };
    document.addEventListener(
      'mousedown',
      handleClickOutside(ref, closeDropdown)
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside(ref, closeDropdown)
      );
    };
  });
  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.selection} onClick={handleDropdownClick}>
        <div className={styles.selected}>{selected}</div>
        {!open && <img src={downArrow} alt="" className={styles.down_arrow} />}
      </div>
      <ul className={styles.items}>
        {open &&
          props.items.map(item => (
            <li className={styles.item} key={Date.now()}>
              <div onClick={handleItemClick} data-type={item}>
                {item}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array,
  handleChange: PropTypes.func,
};

Dropdown.defaultProps = {
  items: [],
  handleChange: () => {},
};
export default Dropdown;
