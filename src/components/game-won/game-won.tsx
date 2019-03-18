import * as React from 'react'
import Confetti from 'react-confetti'
import { withTheme, Theme, IconButton, Typography, WithTheme } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ReactComponent as Trophy } from './icons/trophy.svg'
import styles from './game-won.module.css';
import { ThemedComponentProps } from '@material-ui/core/styles/withTheme';

interface IProps extends WithTheme {
  onClose: () => any;
  points: number;
}

class Content extends  React.Component<any, {width: number, height: number}>{
  element: React.RefObject<HTMLDivElement> = React.createRef();

  state = {
    width: 0, height: 0,
  }

  componentDidMount() {
    if (this.element && this.element.current) {
      this.setState({
        height: this.element.current.clientHeight,
        width: this.element.current.clientWidth,
      })
    }
  }

  render() {
    const { width, height } = this.state;
    return (
      <div ref={this.element} style={{ position: 'relative' }}>
        {(width > 0 && height > 0) && <Confetti width={width} height={height} opacity={0.5} {...{} as any}/>}
        {this.props.children}
      </div>
    )
  }
}

function GameWon({ theme, onClose, points }: IProps) {
  const backgroundColor = theme.palette.primary.light;
  const foregroundColor = theme.palette.primary.dark;
  return (
    <div style={{ backgroundColor }}>
      <header className={styles.header} style={{ backgroundColor: foregroundColor }}>
        <Typography variant="headline" style={{ color: '#e0e0e0'}}>Congrats!</Typography>
        {onClose && (
          <div className={styles.closeButton}>
            <IconButton onClick={onClose}>
              <Close color="inherit" style={{ color: '#fff' }}/>
            </IconButton>
          </div>
        )}
      </header>
      <Content>
        <main className={styles.main}>
          <Trophy />
        </main>
      </Content>
      <footer className={styles.footer}>
        <Typography>Your team has earned <Typography component="span" inline color="primary">+{points}</Typography> points</Typography>
      </footer>
    </div>
  )
}

export default withTheme()(GameWon)