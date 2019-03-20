import React from 'react'
import Chalkboard from '../../components/chalkboard';
import { Typography, withStyles, withTheme, Theme, WithTheme, Chip, Avatar, Button } from '@material-ui/core';
import styles from './gender-prediction.module.css';
import { purple, green } from '@material-ui/core/colors';
import { TypographyProps } from '@material-ui/core/Typography';
import { ReactComponent as BowTie } from './bowtie.svg';
import { ReactComponent as Bow } from './bow.svg';
import { ButtonProps } from '@material-ui/core/Button';

interface IProps {
  girlVoteUserIds: string[] // userIds
  boyVoteUserIds: string[] // userIds
  userVote?: 'boy' | 'girl' | null;
}

const BoyText = withStyles({ root: { color: green[200] }})(({ classes, ...props }: TypographyProps) => {
  return <Typography classes={classes} {...props} />
})

const GirlText = withStyles({ root: { color: purple[100] } })(({ classes, ...props }: TypographyProps) => {
  return <Typography classes={classes} {...props} />
})

const Text = ((props: TypographyProps) => {
  return <Typography variant="display2" style={{ color: '#fff' }} {...props} />
});

const BoyButton = withStyles({ root: { borderColor: green[100], color: green[100] } })(({ classes, ...props }: ButtonProps) => {
  return <Button classes={classes} {...props} />
})

const GirlButton = withStyles({ root: { borderColor: purple[100], color: purple[100] } })(({ classes, ...props }: ButtonProps) => {
  return <Button classes={classes} {...props} />
})

const UserSelectedGenderDisplay = ({ gender }: { gender: 'boy' | 'girl' }) => {
  const color = gender === 'boy' ? green : purple;
  const GenderIcon = gender === 'boy' ? BowTie : Bow;
  return (
    <div>
      <div className={styles.boyCta} style={{ color: color[600] }}>
        <GenderIcon />
      </div>
      <Typography style={{ color: color[600] }}>
        You voted {gender}.
        If you're correct you will add an additional point to your teams total score
      </Typography>
    </div>
  )
}

const VoteCTA = ({ onSelect }: { onSelect: (gender: 'boy' | 'girl') => any}) => {
  return (
    <div className={styles.ctas}>
      <div>
        <div className={styles.boyCta} style={{ color: green[600] }}>
          <BowTie />
        </div>
        <BoyButton size="small" variant="contained">It will be a boy</BoyButton>
      </div>
      <div>
        <div className={styles.girlCta} style={{ color: purple[600] }}>
          <Bow />
        </div>
        <GirlButton size="small" variant="contained">It will be a girl</GirlButton>
      </div>
    </div>
  )
}

const VotedUser = ({ userId, gender }: { userId: string; gender: 'girl' | 'boy' }) => {
  return (
    <Chip
      avatar={<Avatar style={{ background: green[600], color: '#fff' }} children="AE" />}
      style={{
        margin: '8px 0',
        background: green[400], color: '#fff'
      }}
      label="Allie Effertz"
      variant="outlined"
    />
  )
}

export default function GenderPrediction() {
  return (
    <Chalkboard tiled className={styles.root}>
      <header>
        <Typography align="center" component="h1">
          <BoyText variant="display2" component="span" inline>Bowtie</BoyText>
          <Text component="span" color="textPrimary" inline variant="display3"> or </Text>
          <GirlText variant="display2" component="span" inline>Bow</GirlText>
        </Typography>
        <Text align="center" component="h2" variant="display3">Soon we'll know!</Text>
        <Text align="center" component="p" variant="display4">Cast your vote below:</Text>
      </header>
      <div className={styles.smallDivider} />
      <div className={styles.ctas}>
        <div>
          <div className={styles.boyCta} style={{ color: green[600] }}>
            <BowTie />
          </div>
          <BoyButton size="small" variant="outlined">It will be a boy</BoyButton>
        </div>
        <div>
          <div className={styles.girlCta} style={{ color: purple[600] }}>
            <Bow />
          </div>
          <GirlButton size="small" variant="outlined">It will be a girl</GirlButton>
        </div>
      </div>
      <section>
        <div className={styles.divider} />
        <div className={styles.panels}>
          <div className={styles.boysPanel}>
            <header>
              <BoyText variant="display2" component="h4" style={{ fontSize: '2.2rem' }}>Boy</BoyText>
              <BoyText component="span">8 Total</BoyText>
            </header>
            <Chip
              avatar={<Avatar style={{ background: green[600], color: '#fff' }} children="AE" />}
              style={{
                margin: '8px 0',
                background: green[400], color: '#fff'
              }}
              label="Allie Effertz"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar style={{ background: green[600], color: '#fff' }} children="CD" />}
              style={{
                margin: '8px 0',
                background: green[400], color: '#fff'
              }}
              label="Cletus Dooley"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar style={{ background: green[600], color: '#fff' }} children="MC" />}
              style={{
                margin: '8px 0',
                background: green[400], color: '#fff'
              }}
              label="Marilie Carroll"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar style={{ background: green[600], color: '#fff' }} children="EG" />}
              style={{
                margin: '8px 0',
                background: green[400], color: '#fff'
              }}
              label="Emmet Goyette"
              variant="outlined"
            />
          </div>
          <div className={styles.girlsPanel}>
            <header>
              <GirlText variant="display2" component="h4"  align="right" style={{ fontSize: '2.2rem' }}>Girl</GirlText>
              <GirlText component="span">- Total</GirlText>
            </header>
            <Chip
              avatar={<Avatar style={{ background: purple[600], color: '#fff' }} children="AE" />}
              style={{
                margin: '8px 0',
                background: purple[400], color: '#fff'
              }}
              label="Allie Effertz"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar style={{ background: purple[600], color: '#fff' }} children="CD" />}
              style={{
                margin: '8px 0',
                background: purple[400], color: '#fff'
              }}
              label="Cletus Dooley"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar style={{ background: purple[600], color: '#fff' }} children="MC" />}
              style={{
                margin: '8px 0',
                background: purple[400], color: '#fff'
              }}
              label="Marilie Carroll"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar style={{ background: purple[600], color: '#fff' }} children="EG" />}
              style={{
                margin: '8px 0',
                background: purple[400], color: '#fff'
              }}
              label="Emmet Goyette"
              variant="outlined"
            />
          </div>
        </div>
      </section>
    </Chalkboard>
  )
}
