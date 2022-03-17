import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { array, object, string } from 'yup';

import { MultipleFileUploadField } from '../upload/MultipleFileUploadField';
import React from 'react';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{ files: [] }}
          validationSchema={object({
            files: array(
              object({
                url: string().required(),
              })
            ),
          })}
          onSubmit={(values) => {
            console.log("🚀 ~ file: index.tsx ~ line 14 ~ Home ~ values", values)
            return new Promise((res) => setTimeout(res, 2000))
          }

          }>
          {({ values, errors, isValid, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <MultipleFileUploadField name="files" />
                <Grid item>
                  <Button
                    variant="contained" 
                    color="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}>Submit </Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card >
  );
}
