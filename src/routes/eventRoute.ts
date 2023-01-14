import { Router } from "express";
import * as Controller from "../controllers/eventController";
import * as Validator from "../utils/validation/EventValidation";
import { auth } from "../middleware/auth";
import validate from "../middleware/validation";
import { userRequest } from "../types/express";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *    Event:
 *      type: object
 *      required:
 *        - name
 *        - start_date
 *        - end_date
 *      properties:
 *        id:
 *          type: string
 *          description: auto generated uuid
 *        name:
 *          type: string
 *          description: Event name
 *        description:
 *          type: string
 *          description: Event description
 *        start_date:
 *          type: dateTime
 *          description: Event start date and time
 *        end_date:
 *          type: dateTime
 *          description: Event end date and time
 *        isPremium:
 *          type: boolean
 *          description: Event end date and time
 *        author_id:
 *          type: string
 *          description: auto generated uuid
 *        createdAt:
 *          type: date
 *          description: auto generated date
 *        updatedAt:
 *          type: date
 *          description: auto generated date
 *      example:
 *          name: Event of the year
 *          description: This is an event of a life time, you don't want to miss It
 *          start_date: 2023-04-30T02:15:12.356Z
 *          end_date: 2023-04-30T09:15:12.356Z
 *          isPremium: true
 *          event_types: ["fun", "hangout"]
 *          speakers: [{name: "John Doe", designation: "Host"}]
 */

/**
 * @swagger
 * /events/:
 *   get:
 *     tags:
 *       - Events
 *     produces:
 *        - application/json
 *     summary: Retrieve a list of all Events
 *     description: Retrieve a list all Events from the database.
 *
 *     responses:
 *       200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Event'
 *       404:
 *         description: No Event yet
 *
 */
router.get("/", async (_req, res) => {
  try {
    const response = await Controller.allEvents();
    return res.status(200).json({ status: "successful", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

/**
 * @swagger
 * /events/:
 *   post:
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     summary: Create new Event
 *     description: Only Admin can create new event
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Access token does not have the required scope
 *
 */
router.post(
  "/",
  auth,
  validate(Validator.createEventValidation),
  async (req: userRequest, res) => {
    try {
      const payload = req.body;
      const id: string = req.user.user_id;
      const response = await Controller.createEvent(payload, id);
      return res.status(201).json({ status: "successful", response });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "failed", error });
    }
  }
);

router
  .route("/:id")
  /**
   * @swagger
   * /events/{id}:
   *   get:
   *     tags:
   *       - Events
   *     summary: Get single Event by ID
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Event ID
   *     description: Retrieve the event by the unique ID
   *     responses:
   *       200:
   *         description: Event by id
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Event'
   *
   *       404:
   *         description: Event not found
   *       500:
   *         description: internal server error
   *
   */
  .get(validate(Validator.id), async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Controller.viewSingleEvent(id);
      return res.status(200).json({ status: "successful", response });
    } catch (error: any) {
      console.error(error);
      return res.status(error.status).json(error.message);
    }
  })

  /**
   * @swagger
   * /events/{id}:
   *   patch:
   *     tags:
   *       - Events
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Event ID
   *     summary: Update Event by ID
   *     description: Only Admin can update event
   *     requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Event'
   *     responses:
   *       200:
   *         description: Event updated
   *       401:
   *         description: Not authenticated
   *       403:
   *         description: Access token does not have the required scope
   *
   */
  .patch(
    auth,
    validate(Validator.updateEventValidation),
    async (req: userRequest, res) => {
      try {
        const { id } = req.params;
        const { user_id } = req.user;
        const payload = req.body;
        const response = await Controller.updateEventByID(id, user_id, payload);
        return res.status(200).json({ status: "successful", response });
      } catch (error) {
        console.error(error);
        return res.status(500).json(error);
      }
    }
  )
  /**
   * @swagger
   * /events/{id}:
   *   delete:
   *     tags:
   *       - Events
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Event ID
   *     summary: Update Event by ID
   *     description: Only Admin can delete event
   *     responses:
   *       200:
   *         description: Event updated
   *       401:
   *         description: Not authenticated
   *       403:
   *         description: Access token does not have the required scope
   *       404:
   *         description: Event not found
   *
   */
  .delete(auth, validate(Validator.id), async (req: userRequest, res) => {
    try {
      const { user_id } = req.user;
      const event_id = req.params.id;
      const response = await Controller.removeEvent(event_id, user_id);
      return res.status(204).json({ status: "successful", response });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });
export default router;
