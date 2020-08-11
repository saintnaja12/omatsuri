import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import GithubButton from '../GithubButton/GithubButton';
import logoText from '../../assets/logo-text.svg';
import toolsData from '../../data/tools';
import classes from './Navbar.styles.less';

const isActive = (path, match, location) => !!(match || path === location.pathname);
const findCurrentIndex = pathname => toolsData.findIndex(tool => pathname.includes(tool.link));

export default function Navbar({ className }) {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(findCurrentIndex(pathname));

  useEffect(() => {
    setCurrent(findCurrentIndex(pathname));
  }, [pathname]);

  const items = toolsData.map(tool => (
    <NavLink
      key={tool.name}
      to={tool.link}
      exact
      className={classes.link}
      activeClassName={classes.linkActive}
      isActive={isActive.bind(this, tool.link)}
    >
      <img className={classes.icon} src={tool.icon} alt="" />
      <div className={classes.label}>{tool.name}</div>
    </NavLink>
  ));

  return (
    <nav className={cx(classes.navbar, className)}>
      <div className={classes.inner}>
        <div className={classes.main}>
          <Link to="/" className={classes.logo}>
            <img className={classes.logoImage} src={logoText} alt="" />
          </Link>
          <div className={classes.links}>
            {items}
            <div
              className={classes.linkBackground}
              style={{ transform: `translateY(${current * 72}px)` }}
            />
          </div>
        </div>

        <div className={classes.footer}>
          <GithubButton />
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};
