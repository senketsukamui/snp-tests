import React from 'react';
import styles from './index.scss';
import down_arrow from 'assets/images/down_arrow.png';
import { handleClickOutside } from 'utils/handleClickOutside';

const Dropdown = props => {
  const [open, setOpen] = React.useState(false);
  const [selected, changeSelected] = React.useState(props.items[0]);
  const ref = React.useRef(null);

  const handleItemClick = e => {
    changeSelected(e.target.dataset.type);
    props.handleChange(e.target.dataset.type);
    setOpen(false);
  };
  const handleDropdownClick = () => {
    setOpen(!open);
  };
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
        {!open && <img src={down_arrow} alt="" className={styles.down_arrow} />}
      </div>
      <ul className={styles.items}>
        {open &&
          props.items.map(item => (
            <li
              className={styles.item}
              data-type={item}
              onClick={handleItemClick}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
