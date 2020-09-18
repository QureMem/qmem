import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { formatNumber } from "../functions/formatnumber";
import { diacriticsOff } from "../functions/diacriticsOff";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Info from "../version";

import * as diff from "diff";

interface Surah {
  nameEn: string;
  nameTr: string;
  nameAr: string;
  noVerses: number;
  verses: Array<string>;
}
interface LocationState {
  from: {
    pathname: string;
  };
  answers: Array<string>;
  surah: number;
  start: number;
}

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    display: "flex",
    "& p": {
      cursor: "pointer",
    },
  },
  empty: {},
  appBarSpacer: theme.mixins.toolbar,
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  ayaNumber: {},
  hr: {
    backgroundColor: theme.palette.text.secondary,
  },
}));

const Results = () => {
  let classes = useStyles();
  const location = useLocation<LocationState>();
  let history = useHistory();
  const [data, setData] = useState<Surah | null>(null);
  const { answers, surah, start } = location.state || {
    answers: [],
    surah: 1,
    start: 1,
  };
  const [onlyWrong, setOnlyWrong] = useState(false);
  useEffect(() => {
    if (surah) {
      import(`../data/${formatNumber(surah)}.json`).then((res) => {
        setData(res);
      });
    }
  }, [surah]);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.title}>
            <Typography
              className={classes.empty}
              onClick={() => history.push("/")}
            >
              QureMem
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.appBarSpacer}></div>
      <Container style={{ marginTop: 30 }} maxWidth="sm">
        {/*
         ** Code
         */}
        <FormControlLabel
          control={
            <Switch
              checked={onlyWrong}
              onChange={() => setOnlyWrong(!onlyWrong)}
              name="onlywrong"
              color="primary"
            />
          }
          label="Show only errors"
        />
        {answers && data && (
          <List className={classes.root}>
            {answers.map((e, i) => {
              let corrector;
              if (diacriticsOff(e).length === e.length) {
                corrector = diff.diffChars(
                  diacriticsOff(data.verses[start - 1 + i][0]),
                  e,
                  {
                    ignoreCase: true,
                  }
                );
              } else {
                corrector = diff.diffChars(data.verses[start - 1 + i][0], e, {
                  ignoreCase: true,
                });
              }

              let correct =
                corrector.length === 1 &&
                !corrector[0].added &&
                !corrector[0].removed;

              if (onlyWrong && correct) {
                return <span key={i}></span>;
              }

              return (
                <React.Fragment key={i}>
                  <ListItem>
                    <ListItemIcon>
                      <div className={classes.ayaNumber}>{start + i}</div>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        correct ? (
                          <Typography
                            variant="h5"
                            style={{ color: "green" }}
                            align="right"
                          >
                            {data.verses[start - 1 + i][0]}
                          </Typography>
                        ) : (
                          corrector.map((part, i) => {
                            let styl;
                            if (part.added) {
                              styl = {
                                color: "red",
                                textDecoration: "line-through",
                              };
                            } else if (part.removed) {
                              styl = {
                                color: "red",
                              };
                            } else {
                              styl = {
                                color: "seagreen",
                              };
                            }
                            console.log(part);
                            return (
                              <Typography
                                display="inline"
                                key={i}
                                style={styl}
                                variant="h5"
                              >
                                {part.value}
                              </Typography>
                            );
                          })
                        )
                      }
                      secondary={
                        !correct && (
                          <>
                            <span style={{ display: "block" }}>Hello</span>
                            <span style={{ display: "block" }}>World!</span>
                          </>
                        )
                      }
                      color="textPrimary"
                    />
                  </ListItem>
                  {i !== answers.length - 1 && (
                    <Divider className={classes.hr} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        )}
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
export default Results;
