import React, { useState, useEffect } from "react";
import { Typography, withStyles, Chip, Avatar, Button, CircularProgress } from "@material-ui/core";
import { purple, green } from "@material-ui/core/colors";
import { getFirestore } from "../../../firebase";

const VotedUser = ({ vote, gender }: { gender: "boy" | "girl"; vote: { teamId: string; userId: string } }) => {
  const [user, setUser] = useState<firebase.firestore.DocumentData | null | undefined>(undefined);
  const color = gender === "boy" ? green : purple;

  useEffect(() => {
    getFirestore("users")
      .doc(vote.userId)
      .get()
      .then(documentsnapshot => {
        if (!documentsnapshot.exists) throw Error("user doesn't exist");
        setUser(documentsnapshot.data());
      })
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return <CircularProgress />;
  }

  return (
    <Chip
      avatar={
        <Avatar
          style={{ background: color[700], color: "#fff" }}
          children={user && user.displayName.charAt(0).toUpperCase()}
        />
      }
      style={{
        margin: "8px 0",
        background: color[500],
        color: "#fff"
      }}
      label={!!user ? user.displayName : "Error fetching user!"}
      variant="outlined"
    />
  );
};

export default VotedUser;
