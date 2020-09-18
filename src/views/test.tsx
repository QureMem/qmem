import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { formatNumber } from "../functions/formatnumber";
import { diacriticsOff } from "../functions/diacriticsOff";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Info from "../version";
import CloseIcon from "@material-ui/icons/Close";

interface Surah {
  nameEn: string;
  nameTr: string;
  nameAr: string;
  noVerses: number;
  verses: Array<string>;
}

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    display: "flex",
    "& p": {
      cursor: "pointer",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  empty: {},
  appBarSpacer: theme.mixins.toolbar,
  userInput: {
    fontSize: 2,
  },
}));

const Test = () => {
  let classes = useStyles();
  let { surah, start, finish } = useParams();
  surah = parseInt(surah);
  start = parseInt(start);
  finish = parseInt(finish);
  const [current, setCurrent] = useState(start - 1);
  const [data, setData] = useState<Surah | null>(null);
  const [userInput, setUserI] = useState("");
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState<Array<string>>([]);
  let history = useHistory();

  useEffect(() => {
    import(`../data/${formatNumber(surah)}.json`).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (data !== null && userInput !== "") {
      let a = diacriticsOff(data.verses[current][0]);
      let b = diacriticsOff(userInput);
      if (compare(a, b)) {
        if (a.length === b.length) {
          submit();
        }
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [userInput]);

  useEffect(() => {
    if (answers.length > 0) {
      setUserI("");
      if (current + 1 == finish) {
        finishTest();
      }
      setCurrent((c) => current + 1);
    }
  }, [answers]);

  const compare = (a: string, b: string) => {
    return a.slice(0, b.length) === b;
  };
  const validate = (txt: string) => {
    if (txt.charAt(txt.length - 1) === "\n") {
      submit();
    } else {
      setUserI(txt);
    }
  };

  const submit = () => {
    setAnswers([...answers, userInput]);
  };
  const finishTest = () => {
    history.push({
      pathname: "/results/",
      state: {
        answers,
        surah,
        start,
      },
    });
  };
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
          <IconButton
            // aria-label="account of current user"
            // aria-controls="primary-search-account-menu"
            // aria-haspopup="true"
            color="inherit"
            onClick={() => finishTest()}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={classes.appBarSpacer}></div>
      <Container style={{ marginTop: 30 }} maxWidth="sm">
        {/*
         ** Code
         */}
        {data !== null && (
          <>
            <Typography gutterBottom variant="h5">
              {surah !== 1 && current === 0 ? "Bismillah" : null}
              {start !== 1 && current === start - 1
                ? data.verses[current - 1][0]
                : null}
            </Typography>
            <TextField
              inputProps={{ style: { lineHeight: "130%" } }}
              InputProps={{ style: { fontSize: "2rem" } }}
              autoFocus={true}
              fullWidth={true}
              type="string"
              multiline={true}
              value={userInput}
              onChange={(e) => validate(e.target.value)}
              variant="outlined"
              error={error}
              onSubmit={() => submit()}
            />
          </>
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
export default Test;
