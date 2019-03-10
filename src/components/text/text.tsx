import React from 'react'
import cx from 'classnames';
import styles from './text.module.css';

interface IProps {
  element: string;
  variant: 'display1' | 'display2' | 'body';
  className: string;
  children: React.ReactNode;
  theme?: 'mr' | 'mrs'
}

const getFontClass = (variant: IProps['variant']) => {
  switch(variant) {
    case 'display1': 
      return styles.abrilFatFace;
    case 'display2': 
      return styles.greatVibes;
    default:
      return styles.body;
  }
}

const getFontTheme = (theme: IProps['theme']) => {
  switch (theme) {
    case 'mr':
      return styles.mrTheme;
    case 'mrs':
      return styles.mrsTheme;
    default:
      return '';
  }
}

export default function Text({ element, variant, className: classes, theme, ...props }: IProps) {
  const fontClass = getFontClass(variant);
  const fontTheme = getFontTheme(theme);
  const className = cx(fontTheme, fontClass, classes);
  return (
    React.createElement(element, { ...props, className })
  )
}

Text.defaultProps = {
  element: 'span',
  variant: 'body',
  className: '',
}