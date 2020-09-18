import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { formatNumber } from "../functions/formatnumber";
import Info from "../version";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { units } from "../data/units";
import * as Yup from "yup";
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
}));

const Settings = () => {
  let { surah } = useParams();
  let history = useHistory();
  const [verses, setVerses] = useState<Array<string> | null>(null);
  const [max, setMax] = useState(2);
  const classes = useStyles();
  const [divisions, setDivisions] = useState<Array<number> | undefined>(
    undefined
  );
  useEffect(() => {
    import(`../data/${formatNumber(surah)}.json`).then((res) => {
      setMax(res.noVerses);
      setVerses(res.verses);
      setDivisions(units.find((e) => e.surah === res.nameEn)?.units);
    });
  }, []);

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
        <Typography gutterBottom variant="h5">
          الإعدادت
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            startTask: 1,
            endTask: max,
          }}
          validationSchema={Yup.object().shape({
            startTask: Yup.number()
              .required("Required")
              .positive()
              .integer()
              .max(Yup.ref("endTask"), "Should be less than or equal end"),

            endTask: Yup.number()
              .required("Required")
              .positive()
              .integer()
              .min(Yup.ref("startTask"), "Should be more than or equal end")
              .max(max, `This surah contains ${max} ayah`),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            history.push(
              `/test/${surah}/${values.startTask}/${values.endTask}`
            );
          }}
        >
          {({ submitForm }) => (
            <Form>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={4}
              >
                <Grid item>
                  <Field
                    component={TextField}
                    name="startTask"
                    type="number"
                    label="بداية الممارسة"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="endTask"
                    type="number"
                    label="نهاية الممارسة"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
                    بدأ
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {divisions && verses && (
          <List>
            {divisions.map((e, i) => {
              if (i === divisions.length - 1) return;
              return (
                <ListItem
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/test/${surah}/${e + 1}/${divisions[i + 1]}`);
                  }}
                >
                  <ListItemText
                    primary={
                      verses[e][0].length > 50
                        ? verses[e][0].slice(0, 50) + "..."
                        : verses[e][0]
                    }
                    secondary={`من اﻵية ${e + 1} إلى اﻵية ${divisions[i + 1]}`}
                  />
                </ListItem>
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
export default Settings;
