import {
  required,
  email,
  max,
  min,
  alpha_spaces,
  confirmed,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";


export const VeeValidateService = {
  init() {
    extend("required", {
      ...required,
      message: "To pole jest wymagane",
    });

    extend("max", {
      ...max,
      message: "To pole nie może zawierać więcej niż {length} znaków",
    });

    extend("min", {
      ...min,
      message: "To pole musi zawierać przynajmniej {length} znaków",
    });

    extend("email", {
      ...email,
      message: "Podano niepoprawny adres email.",
    });

    extend("alpha_spaces", {
      ...alpha_spaces,
      message: "To pole może zawierać tylko znaki alfanumeryczne i znaki",
    });
    extend("confirmed", {
      ...confirmed,
      message: "Podane hasła nie są takie same",
    });
  },
};
