import express from 'express';
import authAnonymous, { RequestWitUser } from '../middleware/authAnonymous';
import EventPlan from '../models/EventPlan';

const eventsRouter = express.Router();

eventsRouter.get('/', authAnonymous, async (req, res) => {
  const reqUser = (req as RequestWitUser).user;
  try {
    if (reqUser.role === 'user') {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = 15;

      const eventPlanListFull = await EventPlan.find();

      const eventPlanList = await EventPlan.find()
        .skip((page - 1) * perPage)
        .limit(perPage);

      return res.send({ eventPlanListLength: eventPlanListFull.length, eventPlanList });
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default eventsRouter;
