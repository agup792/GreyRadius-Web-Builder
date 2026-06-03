import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import diagnosticLeadsRouter from "./diagnostic-leads";
import newsletterRouter from "./newsletter";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(diagnosticLeadsRouter);
router.use(newsletterRouter);

export default router;
