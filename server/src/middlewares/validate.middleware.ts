import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import _response from "@utils/response.util";

/**
 * Validate middleware using zod and zod schema
 * @param schema
 * @returns
 */
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      _response(res, 400, false, {}, e.errors);
    }
  };

export default validate;
