import { Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import SpecTextField from "../../TextField/SpecTextField";

function ClinicalForm() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid>
      <Typography color="primary" gutterBottom>
        <strong>Заключение</strong>
      </Typography>
      <Controller
        control={control}
        name="clinical_interpretation"
        
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <SpecTextField
            {...field}
            fullWidth
            select
            key="Confirmation Code"
            id="Ambulatory ID-TextField"
            label="Личный номер"
            color="primary"
            error={errors.clinical_interpretation ? true : false}
            helperText={errors?.clinical_interpretation && errors.clinical_interpretation.message}
          >
            {" "}
            <MenuItem value={"PD-L1 positive"}>PD-L1 позитивный</MenuItem>
            <MenuItem value={"PD-L1 negative"}>PD-L1 негативный</MenuItem>
          </SpecTextField>
        )}
      />
    </Grid>
  );
}

export default ClinicalForm;
