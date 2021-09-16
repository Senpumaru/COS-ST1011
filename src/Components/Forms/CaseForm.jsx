import { Button, Card } from "@mui/material";
import moment from "moment";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCase } from "../../Store/Slices/caseSlice";
import ClinicalForm from "./Case/ClinicalForm";
import RegisterForm from "./Case/RegisterForm";

function CaseForm() {
  /*** Redux States ***/
  const dispatch = useDispatch();

  // Account Information
  const { Info } = useSelector((state) => state.Account["Info"]);

  // Case Creation State
  const { Loading, Success, Error } = useSelector((state) => state.Case["Create"]);

  /*** React Hook Form ***/
  const defaultValues = {
    patient: "",
    date_of_dispatch: null,
    date_of_acquisition: null,
    institution: "",
    personal_number: "",
    case_editor: "",
    case_consultants: "",
    clinical_interpretation: "",
  };

  /* React Hook Form - Submit */
  const onSubmit = (data) => {
    console.log("Values:", data);  
    // Data Modification
    data["date_of_dispatch"] = moment(data["date_of_dispatch"]).format("YYYY-MM-DD");
    data["date_of_acquisition"] = moment(data["date_of_acquisition"]).format("YYYY-MM-DD");
    
    // React Hook Form Data Dispatch
    dispatch(createCase(data));
    if (Success) {
      reset();
    }
    
  };

  /* React Hook Form - Form */
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    mode: "onChange",
  });

  const { register, handleSubmit, watch, setValue, formState, getValues, reset, trigger } = methods;
  console.log("Current Data:", getValues())
  

  return (
    <FormProvider {...methods}>
      <form>
        <RegisterForm />
        <ClinicalForm />
        <Button onClick={handleSubmit(onSubmit)}>
          Завершить
        </Button>
      </form>
    </FormProvider>
  );
}

export default CaseForm;
