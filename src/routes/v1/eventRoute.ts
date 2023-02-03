import { Router } from "express";
import * as Controller from "../../controllers/eventController";
import { auth } from "../../middleware/auth";
import validate from "../../middleware/validation";
import { userRequest } from "../../types/express";
import { failed, success } from "../../utils/handleResponse";
import * as Validator from "../../utils/validation/EventValidation";

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
      const id: string = req.user.user_id;
      const data = await Controller.createEvent(payload, id);
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
        const { user_id } = req.user;
        const payload = req.body;
        const data = await Controller.updateEventByID(id, user_id, payload);
        return success(res, data.statusCode, data.message);
      } catch (error: any) {
        console.error(error);
        return failed(res, error.statusCode, error.message);
      }
    }
  )
  .delete(auth, validate(Validator.id), async (req: userRequest, res) => {
    try {
      const { user_id } = req.user;
      const event_id = req.params.id;
      const data = await Controller.removeEvent(event_id, user_id);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  });
export default router;
