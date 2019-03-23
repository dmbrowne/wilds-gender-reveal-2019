import React from "react";
import Chalkboard from "../../components/chalkboard";
import { Typography, IconButton } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import { BoyText, GirlText } from "./components/text";
import VoteCTA from "./components/vote-cta";
import VotedUser from "./components/voted-user";
import BoyCta from "./components/boy-cta";
import GirlCta from "./components/girl-cta";
import { ArrowBack } from "@material-ui/icons";

import styles from "./gender-prediction.module.css";

interface IVote {
  teamId: string;
  userId: string;
}

interface IProps {
  girlVotes: IVote[];
  boyVotes: IVote[];
  userVote?: "boy" | "girl" | null;
  onSelect: (gender: "boy" | "girl") => any;
  onGoBack: () => any;
}

const Text = (props: TypographyProps) => {
  return <Typography style={{ color: "#fff" }} {...props} />;
};

const GenderPrediction: React.FC<IProps> = ({ boyVotes, girlVotes, onSelect, userVote, onGoBack }) => {
  return (
    <Chalkboard tiled className={styles.root}>
      <header className={styles.header}>
        {!!onGoBack && (
          <IconButton onClick={onGoBack}>
            <ArrowBack fontSize="large" style={{ color: "#fff" }} />
          </IconButton>
        )}
        <div>
          <Typography align="center" component="h1">
            <BoyText variant="display2" component="span" inline children="Bowtie" />
            <Text inline children=" or " component="span" color="textPrimary" variant="display3" />
            <GirlText variant="display2" component="span" inline children="Bow" />
          </Typography>
        </div>
      </header>
      <Text align="center" component="h2" variant="display3" children="Soon we'll know!" />
      <Text align="center" component="p" variant="display4" children="Cast your vote below:" />
      <div className={styles.smallDivider} />
      {!!userVote ? userVote === "boy" ? <BoyCta selected /> : <GirlCta selected /> : <VoteCTA onSelect={onSelect} />}
      <section>
        <div className={styles.divider} />
        <div className={styles.panels}>
          <div className={styles.boysPanel}>
            <header>
              <BoyText variant="display2" component="h4" style={{ fontSize: "2.2rem" }} children="Boy" />
              <BoyText component="span" children={`${boyVotes.length} Total`} />
            </header>
            {boyVotes.map(vote => (
              <VotedUser key={vote.userId} vote={vote} gender="boy" />
            ))}
          </div>
          <div className={styles.girlsPanel}>
            <header>
              <GirlText
                variant="display2"
                component="h4"
                align="right"
                style={{ fontSize: "2.2rem" }}
                children="Girl"
              />
              <GirlText component="span" children={`${girlVotes.length} Total`} />
            </header>
            {girlVotes.map(vote => (
              <VotedUser key={vote.userId} vote={vote} gender="girl" />
            ))}
          </div>
        </div>
      </section>
    </Chalkboard>
  );
};

export default GenderPrediction;
