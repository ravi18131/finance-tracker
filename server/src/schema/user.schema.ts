import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const updateUserSchema = object({
  body: object({
    first_name: string({
      required_error: "First name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const userLoginSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }),
    email: string({
      required_error: "Email is required",
    }),
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(8, "Password is too short - should be min 8 chars"),
    confirm_password: string({
      required_error: "Password confirmation is required",
    }),
    token: string({
      required_error: "Token is required",
    }),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  }),
});
