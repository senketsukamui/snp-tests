import React from 'react';
import styles from './index.scss';
import down_arrow from 'assets/images/down_arrow.png';

const Dropdown = props => {
  const [open, setOpen] = React.useState(false);
  const [selected, changeSelected] = React.useState(props.items[0]);
  const handleItemClick = e => {
    changeSelected(e.target.dataset.type);
    props.handleChange(e.target.dataset.type);
    setOpen(false);
  };
  const handleDropdownClick = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.selection} onClick={handleDropdownClick}>
        {selected}
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
