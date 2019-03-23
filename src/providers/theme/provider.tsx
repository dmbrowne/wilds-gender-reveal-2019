import React, { Component } from "react";
import ThemeContext from "./context";
import { createMuiTheme, MuiThemeProvider, Theme, Color } from "@material-ui/core";
import { purple, green } from "@material-ui/core/colors";
import withTeam, { IWithTeamContext } from "../team/team-consumer";
import gameconfig from "../../gameconfig";

const greenPalette = {
  light: "#B2D5BA",
  main: "#61ADA0",
  dark: "#248F8D",
  contrastText: "#fff"
};
const yellowPalette = {
  light: "#fff59d",
  main: "#ffab00",
  dark: "#865000"
};

interface IProps extends IWithTeamContext {
  theme?: "mr" | "mrs";
}

interface IState {
  currentTeam: "mr" | "mrs";
  theme: Theme;
  activeColorPalette: Color;
  opposingColorPalette: Color;
}

const __getThemeBasedOnId = (id: string) => {
  const isMrTheme = id === gameconfig.teamMrId;
  return isMrTheme ? "mr" : "mrs";
};

class ThemeProvider extends Component<IProps, IState> {
  typography = {
    display1: {
      fontSize: "2.2rem",
      fontFamily: '"Luckiest Guy"'
    },
    display2: {
      fontSize: "2.7rem",
      fontFamily: '"Fredericka the Great"'
    },
    display3: {
      fontSize: "2.2rem",
      fontFamily: '"Great Vibes"'
    },
    display4: {
      fontSize: "1.9rem",
      fontFamily: '"Great Vibes"'
    },
    fontFamily: [
      "Lato",
      "Roboto",
      '"San Francisco"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  };

  maleTheme = createMuiTheme({
    typography: this.typography,
    palette: {
      primary: this.getTeamTheme("mr"),
      secondary: yellowPalette
    }
  });

  femaleTheme = createMuiTheme({
    typography: this.typography,
    palette: {
      primary: this.getTeamTheme("mrs")
    }
  });

  constructor(props: IProps) {
    super(props);
    const { selectedTeam } = props.teamContext;
    const defaultTheme =
      selectedTeam && selectedTeam.id ? __getThemeBasedOnId(selectedTeam && selectedTeam.id) : props.theme || "mr";

    this.state = {
      activeColorPalette: defaultTheme === "mr" ? green : purple,
      opposingColorPalette: defaultTheme === "mr" ? purple : green,
      currentTeam: defaultTheme,
      theme: defaultTheme === "mr" ? this.maleTheme : this.femaleTheme
    };
  }

  componentDidUpdate = (prevProps: IProps) => {
    if (!this.props.teamContext.selectedTeam) {
      return false;
    }
    const newSelectedTeamId = this.props.teamContext.selectedTeam.id;
    if (
      !prevProps.teamContext.selectedTeam ||
      prevProps.teamContext.selectedTeam.id !== this.props.teamContext.selectedTeam.id
    ) {
      this.switchTheme(__getThemeBasedOnId(newSelectedTeamId));
    }
  };

  getTeamTheme(team: "mr" | "mrs") {
    return team === "mr" ? greenPalette : purple;
  }

  switchTheme(team: "mr" | "mrs") {
    this.setState({
      currentTeam: team,
      activeColorPalette: team === "mr" ? green : purple,
      opposingColorPalette: team === "mr" ? purple : green,
      theme: team === "mr" ? this.maleTheme : this.femaleTheme
    });
  }

  getOpposingTeamThemeStyles = (theme?: "mr" | "mrs") => {
    theme = theme || this.state.currentTeam;
    const oppositeTheme = theme === "mr" ? "mrs" : "mr";
    return oppositeTheme === "mr" ? this.maleTheme : this.femaleTheme;
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          switchTheme: this.switchTheme.bind(this),
          getOpposingTeamThemeStyles: this.getOpposingTeamThemeStyles.bind(this),
          currentTeam: this.state.currentTeam as "mr" | "mrs",
          activeColorPalette: this.state.activeColorPalette,
          opposingColorPalette: this.state.opposingColorPalette
        }}
      >
        <MuiThemeProvider theme={this.state.theme}>{this.props.children}</MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }
}

const TeamThemeProvider = withTeam(ThemeProvider);

export default TeamThemeProvider;
