import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Surats from "../data/surats.json";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Container from "@material-ui/core/Container";
import Info from "../version";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    display: "flex",
    "& p": {
      cursor: "pointer",
    },
  },
  searchless: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Index: React.FC = () => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.title}>
            <Typography
              className={classes.searchless}
              onClick={() => history.push("/")}
            >
              QureMem
            </Typography>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="البحث"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.appBarSpacer}></div>
      <Container style={{ marginTop: 30 }} maxWidth="sm">
        <Typography gutterBottom variant="h4" align="center">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Typography>
        {Surats.map((e, i) => (
          <Link key={i} to={`/settings/${i + 1}`}>
            <MuiLink style={{ display: "block", padding: 5 }} component="div">
              <Typography variant="h5">
                {i + 1}. سورة {e.nameAr}
              </Typography>
            </MuiLink>
          </Link>
        ))}
        <Typography
          align="center"
          style={{ fontSize: 11, fontFamily: `courier`, padding: 10 }}
        >
          <span dir="ltr">
            v{Info.version} © QureMem, {Info.year}
          </span>
        </Typography>
      </Container>
    </>
  );
};

export default Index;
