import { Router } from "express";
import * as Controller from "../controllers/eventController";
import * as Validator from "../utils/validation/EventValidation";
import { auth } from "../middleware/auth";
import validate from "../middleware/validation";
import { userRequest } from "../types/express";
import { failed, success } from "../utils/handleResponse";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const data = await Controller.allEvents();
    return success(res, data.statusCode, data.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
});

router.post(
  "/",
  auth,
  validate(Validator.createEventValidation),
  async (req: userRequest, res) => {
    try {
      const payload = req.body;
      const id: string = req.user.userId;
      const data = await Controller.createEvent(payload, id);
      console.log("res", data)
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  }
);

router
  .route("/:id")
  .get(validate(Validator.id), async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Controller.viewSingleEvent(id);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  })
  .patch(
    auth,
    validate(Validator.updateEventValidation),
    async (req: userRequest, res) => {
      try {
        const { id } = req.params;
        const { userId } = req.user;
        const payload = req.body;
        const data = await Controller.updateEventByID(id, userId, payload);
        return success(res, data.statusCode, data.message);
      } catch (error: any) {
        console.error(error);
        return failed(res, error.statusCode, error.message);
      }
    }
  )
  .delete(auth, validate(Validator.id), async (req: userRequest, res) => {
    try {
      const { userId } = req.user;
      const event_id = req.params.id;
      const data = await Controller.removeEvent(event_id, userId);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  });
export default router;
